import Link from "next/link";
import { ArrowLeft, Ellipsis, Eye, Star, Users } from "lucide-react";
import AppShell from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { CompletionManagement } from "@/features/items/components/CompletionManagement";

const item = {
  requiresCompletion: true,
  completionStatus: "INCOMPLETE" as const,
};

export default function ItemDetailPage() {
  return (
    <AppShell title="전달사항 상세">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/items"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="size-4" /> 전달사항 목록
        </Link>
        <article className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-gradient-to-br from-white to-blue-50/50 p-5 sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-0 bg-blue-50 text-blue-700">
                  요청
                </Badge>
                <span className="flex items-center gap-1 text-xs font-medium text-amber-600">
                  <Star className="size-3 fill-current" /> 중요
                </span>
              </div>
              <button className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                <Ellipsis className="size-5" />
              </button>
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
              행사 부스 운영 인력 확인
            </h2>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="grid size-8 place-items-center rounded-full bg-violet-400 text-xs font-semibold text-white">
                이
              </span>
              <span>
                <b className="font-semibold text-slate-700">이수진</b> · 10분 전
              </span>
            </div>
          </div>
          <div className="p-5 sm:p-8">
            <div className="whitespace-pre-line text-[15px] leading-7 text-slate-700">
              금주 금요일 행사 운영 가능 시간을 확인해 주세요.\n\n오전 10시부터
              오후 6시까지이며, 가능한 시간대를 댓글 대신 아래 완료 상태로
              표시해주시면 됩니다.
            </div>
            <div className="mt-8 grid gap-3 border-y border-slate-100 py-5 sm:grid-cols-2">
              <Info
                icon={<Users className="size-4" />}
                label="대상"
                value="팀 전체"
              />
              <Info
                icon={<Eye className="size-4" />}
                label="읽음"
                value="5명 확인"
              />
            </div>
            {item.requiresCompletion && (
              <CompletionManagement
                completionHref="/items/sample/completion"
                status={item.completionStatus}
              />
            )}
          </div>
        </article>
      </div>
    </AppShell>
  );
}
function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-slate-400">{icon}</span>
      <span>
        <span className="block text-xs text-slate-400">{label}</span>
        <span className="block text-sm font-medium text-slate-700">
          {value}
        </span>
      </span>
    </div>
  );
}
