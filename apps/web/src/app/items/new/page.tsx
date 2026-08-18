import Link from "next/link";
import { ArrowLeft, ChevronDown, Send, Star, Users } from "lucide-react";
import AppShell from "@/components/AppShell";

export default function NewItemPage() {
  return (
    <AppShell title="전달사항 작성">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/items"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="size-4" /> 목록으로
        </Link>
        <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold">새 전달사항</h2>
          <p className="mt-1 text-sm text-slate-500">
            누가, 무엇을 확인해야 하는지 명확하게 적어주세요.
          </p>
          <form className="mt-7 space-y-6">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">제목</span>
              <input
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                placeholder="전달할 내용을 한 줄로 적어주세요"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">내용</span>
              <textarea
                className="min-h-40 w-full resize-none rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                placeholder="상세 내용, 기한, 필요한 행동을 작성해주세요."
              />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="카테고리" value="요청" />
              <Field
                label="대상"
                value="팀 전체"
                icon={<Users className="size-4" />}
              />
            </div>
            <div className="grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2">
              <Toggle
                icon={<Star className="size-4 text-amber-500" />}
                title="중요 전달사항"
                text="더 눈에 띄게 표시해요."
              />
              <Toggle
                icon={
                  <span className="grid size-4 place-items-center rounded border-2 border-blue-600 text-[10px] font-bold text-blue-600">
                    ✓
                  </span>
                }
                title="완료 관리"
                text="팀원이 처리 상태를 변경해요."
              />
            </div>
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1d4ed8] text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-800"
            >
              <Send className="size-4" /> 전달사항 등록
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
function Field({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 px-4 text-sm text-slate-700"
      >
        {" "}
        <span className="flex items-center gap-2">
          {icon}
          {value}
        </span>
        <ChevronDown className="size-4 text-slate-400" />
      </button>
    </label>
  );
}
function Toggle({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <button
      type="button"
      className="flex items-start gap-3 rounded-xl bg-white p-3 text-left ring-1 ring-slate-200"
    >
      <span className="mt-0.5">{icon}</span>
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        <span className="mt-0.5 block text-xs text-slate-500">{text}</span>
      </span>
    </button>
  );
}
