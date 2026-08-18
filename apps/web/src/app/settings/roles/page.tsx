import { Check, Plus, ShieldCheck, X } from "lucide-react";
import AppShell from "@/components/AppShell";
export default function RolesPage() {
  return (
    <AppShell title="역할 및 권한">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold">역할 및 권한</h2>
        <p className="mt-2 text-sm text-slate-500">
          역할별로 팀 관리 권한을 지정할 수 있습니다.
        </p>
        <div className="mt-7 space-y-3">
          {[
            ["운영 관리자", "팀원 초대, 카테고리 관리, 전달사항 수정"],
            ["콘텐츠 담당", "전달사항 수정"],
          ].map(([name, rule]) => (
            <div
              key={name}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-700">
                <ShieldCheck className="size-5" />
              </span>
              <span className="flex-1">
                <b className="block">{name}</b>
                <span className="mt-1 block text-sm text-slate-500">
                  {rule}
                </span>
              </span>
              <button className="text-sm text-blue-700">수정</button>
            </div>
          ))}
        </div>
        <button className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium">
          <Plus className="size-4" /> 역할 만들기
        </button>
        <div className="mt-9 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">역할 변경</h3>
            <button>
              <X className="size-4 text-slate-400" />
            </button>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            이수진님에게 적용할 역할을 선택하세요.
          </p>
          <button className="mt-4 flex w-full items-center justify-between rounded-xl bg-blue-50 p-3 text-sm text-blue-800">
            <span>운영 관리자</span>
            <Check className="size-4" />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
