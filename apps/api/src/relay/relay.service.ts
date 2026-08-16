import { HttpStatus, Injectable } from "@nestjs/common";
import { ItemListQuery } from "@relay-work/contracts";
import { AudienceTargetType, AudienceType, CompletionStatus, Prisma } from "@prisma/client";
import { ApiError } from "../common/api-error.js";
import { PrismaService } from "../prisma/prisma.service.js";

const permissions = ["TEAM_SETTINGS_UPDATE", "MEMBER_INVITE", "MEMBER_REMOVE", "CATEGORY_MANAGE", "ITEM_UPDATE_ANY"] as const;
export type Permission = (typeof permissions)[number];

@Injectable()
export class RelayService {
  constructor(private readonly prisma: PrismaService) {}

  get db() { return this.prisma; }

  async member(teamId: string, userId: string) {
    const member = await this.prisma.teamMember.findUnique({ where: { teamId_userId: { teamId, userId } }, include: { roles: { include: { role: true } }, user: true } });
    if (!member?.isActive) throw new ApiError(HttpStatus.FORBIDDEN, "TEAM_ACCESS_DENIED", "이 팀에 접근할 권한이 없습니다.");
    return member;
  }

  has(member: Awaited<ReturnType<RelayService["member"]>>, permission: Permission) {
    if (member.isOwner) return true;
    return member.roles.some(({ role }) => role.isActive && JSON.parse(role.permissions).includes(permission));
  }

  require(member: Awaited<ReturnType<RelayService["member"]>>, permission: Permission) {
    if (!this.has(member, permission)) throw new ApiError(HttpStatus.FORBIDDEN, "PERMISSION_DENIED", "이 작업을 수행할 권한이 없습니다.");
  }

  async visibleItem(itemId: string, userId: string) {
    const item = await this.prisma.item.findUnique({ where: { id: itemId }, include: { category: true, author: { include: { user: true } }, audiences: true } });
    if (!item) throw new ApiError(HttpStatus.NOT_FOUND, "ITEM_NOT_FOUND", "전달사항을 찾을 수 없습니다.");
    const member = await this.member(item.teamId, userId);
    const allowed = item.authorMemberId === member.id || item.audienceType === AudienceType.TEAM || item.audiences.some((audience) => audience.targetMemberId === member.id || (audience.targetRoleId && member.roles.some(({ roleId }) => roleId === audience.targetRoleId)));
    if (!allowed) throw new ApiError(HttpStatus.FORBIDDEN, "ITEM_ACCESS_DENIED", "이 전달사항을 조회할 권한이 없습니다.");
    return { item, member };
  }

  async listTeams(userId: string) {
    return this.prisma.team.findMany({ where: { members: { some: { userId, isActive: true } } }, select: { id: true, name: true, description: true, updatedAt: true } });
  }

  async createTeam(userId: string, name: string, description?: string) {
    return this.prisma.$transaction(async (tx) => {
      const team = await tx.team.create({ data: { name, description } });
      await tx.teamMember.create({ data: { teamId: team.id, userId, isOwner: true } });
      await tx.teamCategory.createMany({ data: ["공지", "요청", "일정", "이슈", "기타"].map((name, sortOrder) => ({ teamId: team.id, name, sortOrder, isDefault: true })) });
      return team;
    });
  }

  async home(teamId: string, userId: string) {
    const member = await this.member(teamId, userId);
    const visible = await this.listItems(teamId, member, { limit: 100, unreadOnly: false });
    const items = visible.data;
    return { unreadCount: items.filter((item) => !item.readAt).length, importantCount: items.filter((item) => item.isImportant).length, incompleteCount: items.filter((item) => item.completionStatus === "INCOMPLETE").length };
  }

  async listItems(teamId: string, member: Awaited<ReturnType<RelayService["member"]>>, options: ItemListQuery) {
    const roleIds = member.roles.filter(({ role }) => role.isActive).map(({ roleId }) => roleId);
    const visibilityFilters: Prisma.ItemWhereInput[] = [
      { authorMemberId: member.id },
      { audienceType: AudienceType.TEAM },
      { audiences: { some: { targetMemberId: member.id } } },
      ...(roleIds.length ? [{ audiences: { some: { targetRoleId: { in: roleIds } } } }] : []),
    ];
    const where: Prisma.ItemWhereInput = {
      teamId,
      AND: [{ OR: visibilityFilters }, ...(options.keyword ? [{ OR: [{ title: { contains: options.keyword } }, { content: { contains: options.keyword } }] }] : [])],
      ...(options.categoryId ? { categoryId: options.categoryId } : {}),
      ...(options.isImportant === undefined ? {} : { isImportant: options.isImportant }),
      ...(options.unreadOnly ? { reads: { none: { teamMemberId: member.id } } } : {}),
      ...(options.completionStatus ? { completionStatus: options.completionStatus } : {}),
      ...((options.createdFrom || options.createdTo) ? { createdAt: { ...(options.createdFrom ? { gte: new Date(options.createdFrom) } : {}), ...(options.createdTo ? { lte: new Date(options.createdTo) } : {}) } } : {}),
    };
    const records = await this.prisma.item.findMany({ where, orderBy: [{ createdAt: "desc" }, { id: "desc" }], take: options.limit + 1, ...(options.cursor ? { cursor: { id: options.cursor }, skip: 1 } : {}), include: { category: true, author: { include: { user: true } }, audiences: true, reads: { where: { teamMemberId: member.id } } } });
    const hasNextPage = records.length > options.limit;
    const data = records.slice(0, options.limit).map((item) => this.summary(item));
    return { data, meta: { nextCursor: hasNextPage ? data.at(-1)?.id ?? null : null, hasNextPage } };
  }

  summary(item: any) { return { id: item.id, teamId: item.teamId, title: item.title, category: { id: item.category.id, name: item.category.name }, isImportant: item.isImportant, audienceType: item.audienceType, requiresCompletion: item.requiresCompletion, completionStatus: item.completionStatus, author: { id: item.author.user.id, name: item.author.user.name }, readAt: item.reads?.[0]?.readAt ?? null, createdAt: item.createdAt, updatedAt: item.updatedAt }; }
}
