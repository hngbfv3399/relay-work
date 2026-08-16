import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const defaults = ["공지", "요청", "일정", "이슈", "기타"];

async function main() {
  await prisma.itemRead.deleteMany();
  await prisma.itemAudience.deleteMany();
  await prisma.item.deleteMany();
  await prisma.teamMemberRole.deleteMany();
  await prisma.teamRole.deleteMany();
  await prisma.teamCategory.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.team.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({ data: [
    { id: "user_owner", name: "지호" },
    { id: "user_minsu", name: "민수" },
    { id: "user_sujin", name: "수진" },
    { id: "user_external", name: "외부 사용자" },
  ] });
  const team = await prisma.team.create({ data: { name: "Relay Work 데모 팀", description: "소규모 팀 업무 소통 데모" } });
  const [owner, minsu, sujin] = await Promise.all([
    prisma.teamMember.create({ data: { teamId: team.id, userId: "user_owner", isOwner: true } }),
    prisma.teamMember.create({ data: { teamId: team.id, userId: "user_minsu" } }),
    prisma.teamMember.create({ data: { teamId: team.id, userId: "user_sujin" } }),
  ]);
  const manager = await prisma.teamRole.create({ data: { teamId: team.id, name: "매장 관리자", permissions: JSON.stringify(["MEMBER_INVITE", "MEMBER_REMOVE", "CATEGORY_MANAGE", "ITEM_UPDATE_ANY"]) } });
  const announcer = await prisma.teamRole.create({ data: { teamId: team.id, name: "공지 담당자", permissions: JSON.stringify(["ITEM_UPDATE_ANY"]) } });
  await prisma.teamMemberRole.createMany({ data: [{ teamMemberId: minsu.id, roleId: manager.id }, { teamMemberId: sujin.id, roleId: announcer.id }] });
  const categories = await Promise.all(defaults.map((name, sortOrder) => prisma.teamCategory.create({ data: { teamId: team.id, name, sortOrder, isDefault: true } })));
  const notice = await prisma.item.create({ data: { teamId: team.id, categoryId: categories[0].id, authorMemberId: owner.id, title: "금요일 운영 시간 변경", content: "이번 주 금요일은 18시에 마감합니다.", isImportant: true } });
  const request = await prisma.item.create({ data: { teamId: team.id, categoryId: categories[1].id, authorMemberId: owner.id, title: "재고 수량 확인", content: "오늘 마감 전까지 재고를 확인해주세요.", audienceType: "SELECTED", requiresCompletion: true, completionStatus: "INCOMPLETE" } });
  await prisma.itemAudience.create({ data: { itemId: request.id, targetMemberId: minsu.id, targetType: "MEMBER" } });
  const roleItem = await prisma.item.create({ data: { teamId: team.id, categoryId: categories[3].id, authorMemberId: owner.id, title: "관리자 전달사항", content: "관리자 역할을 가진 멤버에게만 보입니다.", audienceType: "SELECTED" } });
  await prisma.itemAudience.create({ data: { itemId: roleItem.id, targetRoleId: manager.id, targetType: "ROLE" } });
  await prisma.itemRead.create({ data: { itemId: notice.id, teamMemberId: minsu.id } });
  console.log(`Seeded team: ${team.id}`);
}

main().finally(() => prisma.$disconnect());
