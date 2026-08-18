import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Users } from "lucide-react";

export default function NewTeamPage() {
  return (
    <main className="min-h-dvh bg-[#f8fafc] px-5 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-xl">
        <header className="flex items-center justify-between">
          <Link
            href="/teams"
            className="inline-flex size-10 items-center justify-center rounded-xl text-slate-500 hover:bg-white"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-[#1e40af] text-sm font-bold text-white">
              R
            </span>
            <span className="font-semibold">Relay Work</span>
          </Link>
          <span className="size-10" />
        </header>
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:mt-16 sm:p-10">
          <div className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">
            <Users className="size-6" />
          </div>
          <p className="mt-7 text-sm font-semibold text-blue-600">
            새 팀 만들기
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            함께 일할 공간을 만드세요.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            팀 이름과 간단한 설명을 추가하면 바로 전달사항을 공유할 수 있어요.
          </p>
          <form className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                팀 이름 <em className="not-italic text-blue-600">*</em>
              </span>
              <input
                placeholder="예: 리워크 디자인팀"
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                팀 설명{" "}
                <span className="font-normal text-slate-400">(선택)</span>
              </span>
              <textarea
                placeholder="팀이 어떤 일을 하는 곳인지 간단히 적어주세요."
                className="min-h-28 w-full resize-none rounded-xl border border-slate-200 p-4 text-sm outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </label>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Check className="size-4 text-blue-600" /> 기본 카테고리가
                자동으로 추가돼요
              </p>
              <p className="mt-1 pl-6 text-xs text-slate-500">
                공지, 요청, 일정, 이슈, 기타
              </p>
            </div>
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1d4ed8] text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-colors hover:bg-blue-800"
            >
              팀 만들기 <ArrowRight className="size-4" />
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
