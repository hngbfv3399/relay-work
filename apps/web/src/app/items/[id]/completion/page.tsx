import {
  ArrowLeft,
  CheckCircle2,
  CircleAlert,
  Clock3,
  ListChecks,
  Users,
} from "lucide-react";
import Link from "next/link";

import AppShell from "@/components/AppShell";

const members = [
  {
    name: "민수",
    role: "매장 관리자",
    state: "처리 완료",
    time: "오늘 10:24",
    initial: "민",
    tone: "bg-orange-400",
    done: true,
  },
  {
    name: "수진",
    role: "공지 담당자",
    state: "확인 중",
    time: "읽음 · 오늘 10:18",
    initial: "수",
    tone: "bg-violet-400",
    done: false,
  },
  {
    name: "지호",
    role: "팀장",
    state: "미처리",
    time: "아직 처리하지 않았어요",
    initial: "지",
    tone: "bg-blue-500",
    done: false,
  },
];

export default function CompletionPage() {
  return (
    <AppShell title="처리 현황" eyebrow="전달사항">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/items/sample"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
        >
          <ArrowLeft className="size-4" /> 전달사항 상세
        </Link>

        <section className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <header className="border-b border-slate-100 p-5 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
                  <CircleAlert className="size-3.5" /> 완료 관리 중
                </span>
                <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  행사 부스 운영 인력 확인
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  대상 팀원의 처리 상태를 확인할 수 있어요.
                </p>
              </div>
              <span className="grid size-11 place-items-center rounded-2xl bg-rose-50 text-rose-600">
                <ListChecks className="size-5" />
              </span>
            </div>
          </header>

          <div className="p-5 sm:p-8">
            <section className="rounded-2xl bg-slate-50 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    전체 처리 현황
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    3명 중 1명이 처리를 완료했어요.
                  </p>
                </div>
                <strong className="text-2xl font-bold tracking-tight text-rose-600">
                  1 / 3
                </strong>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-1/3 rounded-full bg-emerald-500" />
              </div>
            </section>

            <div className="mt-8 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">대상별 처리 상태</h2>
                <p className="mt-1 text-sm text-slate-500">
                  처리 상태가 변경된 순서로 표시됩니다.
                </p>
              </div>
              <span className="hidden items-center gap-1 text-xs font-medium text-slate-400 sm:flex">
                <Users className="size-3.5" /> 대상 3명
              </span>
            </div>

            <ul className="mt-4 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
              {members.map((member) => (
                <li
                  key={member.name}
                  className="flex items-center gap-3 p-4 sm:p-5"
                >
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white ${member.tone}`}
                  >
                    {member.initial}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-1.5">
                      <span className="font-semibold text-slate-800">
                        {member.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {member.role}
                      </span>
                    </span>
                    <span className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                      <Clock3 className="size-3" /> {member.time}
                    </span>
                  </span>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${member.done ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                  >
                    {member.done && <CheckCircle2 className="size-3.5" />}
                    {member.state}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
