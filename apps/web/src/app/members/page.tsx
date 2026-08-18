import { Mail, MoreHorizontal, Plus, ShieldCheck, Users } from "lucide-react";
import AppShell from "@/components/AppShell";

const people = [
  ["김", "김지호", "지호@relay.work", "OWNER", "bg-violet-400"],
  ["이", "이수진", "sujin@relay.work", "운영 관리자", "bg-rose-400"],
  ["박", "박민수", "minsu@relay.work", "팀원", "bg-amber-400"],
  ["최", "최하늘", "sky@relay.work", "팀원", "bg-blue-400"],
];
export default function MembersPage() {
  return (
    <AppShell
      title="팀원"
      action={
        <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#1d4ed8] px-3 text-sm font-semibold text-white shadow-md shadow-blue-200">
          <Plus className="size-4" />
          <span className="hidden sm:inline">팀원 추가</span>
        </button>
      }
    >
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">팀원 관리</h2>
          <p className="mt-2 text-sm text-slate-500">
            현재 팀에 참여 중인 12명의 팀원입니다.
          </p>
        </div>
        <Users className="size-6 text-slate-300" />
      </div>
      <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {people.map(([initial, name, email, role, color]) => (
          <div
            key={name}
            className="flex items-center gap-3 border-b border-slate-100 p-4 last:border-0 sm:p-5"
          >
            <span
              className={`grid size-10 place-items-center rounded-full ${color} text-sm font-semibold text-white`}
            >
              {initial}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-800">{name}</p>
              <p className="truncate text-sm text-slate-500">{email}</p>
            </div>
            <span className="hidden items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600 sm:flex">
              {role === "OWNER" && (
                <ShieldCheck className="size-3.5 text-blue-600" />
              )}
              {role}
            </span>
            <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
              <MoreHorizontal className="size-5" />
            </button>
          </div>
        ))}
      </section>
      <p className="mt-4 flex items-center gap-2 text-xs text-slate-400">
        <Mail className="size-3.5" /> 초대 기능은 연결 시 이메일 또는 링크 초대
        방식으로 확장할 수 있습니다.
      </p>
    </AppShell>
  );
}
