import Link from "next/link";
import { ArrowRight, Clock3, MoreHorizontal, Plus, Users } from "lucide-react";

const teams = [
  {
    name: "리워크 디자인팀",
    description: "제품 디자인과 브랜드 경험을 함께 만드는 팀",
    people: 12,
    updated: "10분 전",
    mark: "R",
    colors: "from-blue-600 to-indigo-600",
  },
  {
    name: "가을 행사 운영팀",
    description: "2026 가을 팝업 행사 운영 및 현장 지원",
    people: 8,
    updated: "어제",
    mark: "F",
    colors: "from-orange-400 to-rose-500",
  },
];

export default function TeamsPage() {
  return (
    <main className="min-h-dvh bg-[#f8fafc] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[#1e40af] text-lg font-bold text-white">
              R
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Relay Work
            </span>
          </Link>
          <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-sm font-semibold text-white">
            김
          </span>
        </header>
        <section className="mt-14 sm:mt-20">
          <p className="text-sm font-semibold text-blue-600">내 팀</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                어느 팀에서 일할까요?
              </h1>
              <p className="mt-3 text-sm text-slate-500 sm:text-base">
                참여 중인 팀을 선택하면 최신 전달사항을 확인할 수 있어요.
              </p>
            </div>
            <Link
              href="/teams/new"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#1d4ed8] px-4 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-colors hover:bg-blue-800"
            >
              <Plus className="size-4" /> 새 팀 만들기
            </Link>
          </div>
        </section>
        <section className="mt-9 grid gap-4 sm:grid-cols-2">
          {teams.map((team) => (
            <Link
              href="/"
              key={team.name}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-6"
            >
              <div className="flex items-start justify-between">
                <span
                  className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${team.colors} text-xl font-bold text-white shadow-sm`}
                >
                  {team.mark}
                </span>
                <button
                  aria-label={`${team.name} 메뉴`}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
                >
                  <MoreHorizontal className="size-5" />
                </button>
              </div>
              <h2 className="mt-7 text-xl font-semibold text-slate-800">
                {team.name}
              </h2>
              <p className="mt-2 min-h-10 text-sm leading-relaxed text-slate-500">
                {team.description}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Users className="size-3.5" /> {team.people}명
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock3 className="size-3.5" /> {team.updated}
                </span>
              </div>
              <span className="mt-5 flex items-center gap-1 text-sm font-semibold text-blue-700">
                팀으로 이동{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
          <Link
            href="/teams/new"
            className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 p-6 text-center transition-colors hover:border-blue-300 hover:bg-blue-50/40"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-slate-100 text-slate-500">
              <Plus className="size-5" />
            </span>
            <h2 className="mt-4 font-semibold text-slate-700">새 팀 만들기</h2>
            <p className="mt-1 max-w-48 text-sm text-slate-500">
              동료와 전달사항을 관리할 새 공간을 만드세요.
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}
