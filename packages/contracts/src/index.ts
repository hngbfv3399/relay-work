import { z } from "zod";

export const permissionCodes = [
  "TEAM_SETTINGS_UPDATE",
  "MEMBER_INVITE",
  "MEMBER_REMOVE",
  "CATEGORY_MANAGE",
  "ITEM_UPDATE_ANY",
] as const;

export type PermissionCode = (typeof permissionCodes)[number];
export type AudienceType = "TEAM" | "SELECTED";
export type AudienceTargetType = "MEMBER" | "ROLE";
export type CompletionStatus = "INCOMPLETE" | "COMPLETE";

export type ApiSuccess<T> = { data: T };
export type ApiList<T> = ApiSuccess<T[]> & { meta: { nextCursor: string | null; hasNextPage: boolean } };
export type ApiFailure = { error: { code: string; message: string } };

export const audienceTypeSchema = z.enum(["TEAM", "SELECTED"]);
export const audienceTargetTypeSchema = z.enum(["MEMBER", "ROLE"]);
export const completionStatusSchema = z.enum(["INCOMPLETE", "COMPLETE"]);
export const permissionCodeSchema = z.enum(permissionCodes);
const queryBoolean = z.preprocess((value) => {
  if (value === undefined) return undefined;
  if (value === "true" || value === true) return true;
  if (value === "false" || value === false) return false;
  return value;
}, z.boolean());

export const itemAudienceSchema = z.object({
  targetType: audienceTargetTypeSchema,
  targetMemberId: z.string().min(1).optional(),
  targetRoleId: z.string().min(1).optional(),
});

export const registerDemoUserSchema = z.object({
  name: z.string().trim().min(1).max(40),
});

export const createItemSchema = z.object({
  title: z.string().trim().min(1).max(120),
  content: z.string().trim().min(1).max(5000),
  categoryId: z.string().min(1),
  isImportant: z.boolean().default(false),
  audienceType: audienceTypeSchema.default("TEAM"),
  audiences: z.array(itemAudienceSchema).default([]),
  requiresCompletion: z.boolean().default(false),
});

export const updateItemSchema = createItemSchema.partial();

export const itemListQuerySchema = z.object({
  cursor: z.string().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  categoryId: z.string().min(1).optional(),
  isImportant: queryBoolean.optional(),
  unreadOnly: queryBoolean.default(false),
  completionStatus: completionStatusSchema.optional(),
  keyword: z.string().trim().min(1).max(120).optional(),
  createdFrom: z.string().datetime().optional(),
  createdTo: z.string().datetime().optional(),
}).refine((value) => !value.createdFrom || !value.createdTo || value.createdFrom <= value.createdTo, {
  message: "createdFrom은 createdTo보다 늦을 수 없습니다.",
});

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
export type ItemListQuery = z.infer<typeof itemListQuerySchema>;
