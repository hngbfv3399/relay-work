import { GripVertical, Plus } from "lucide-react";
import AppShell from "@/components/AppShell";
export default function CategoriesPage() {
  return (
    <AppShell title="카테고리">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold">카테고리 관리</h2>
        <p className="mt-2 text-sm text-slate-500">
          전달사항을 쉽게 분류할 수 있도록 카테고리를 정리하세요.
        </p>
        <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {["공지", "요청", "일정", "이슈", "기타"].map((x, i) => (
            <div
              key={x}
              className="flex items-center gap-3 border-b border-slate-100 p-4 last:border-0"
            >
              <GripVertical className="size-4 text-slate-300" />
              <span
                className={`size-2 rounded-full ${["bg-violet-500", "bg-blue-500", "bg-amber-500", "bg-rose-500", "bg-slate-400"][i]}`}
              />
              <span className="flex-1 text-sm font-medium">{x}</span>
              <button className="text-xs text-slate-500">수정</button>
            </div>
          ))}
        </div>
        <button className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600">
          <Plus className="size-4" /> 카테고리 추가
        </button>
      </div>
    </AppShell>
  );
}
