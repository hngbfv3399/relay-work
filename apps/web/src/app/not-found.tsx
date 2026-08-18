import { Compass, Home, Sparkles } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-[#f8fafc] px-5 py-10">
      <div className="absolute -left-24 top-10 size-80 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -bottom-32 -right-16 size-96 rounded-full bg-indigo-200/40 blur-3xl" />

      <section className="relative w-full max-w-xl text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#173c8b] text-lg font-bold text-white shadow-lg shadow-blue-200">
          R
        </div>

        <div className="relative mx-auto mt-12 grid size-36 place-items-center rounded-[2.5rem] border border-blue-100 bg-white shadow-xl shadow-blue-950/5 sm:size-40">
          <div className="absolute inset-3 rounded-[2rem] border border-dashed border-blue-200" />
          <Compass className="relative size-14 text-blue-600 sm:size-16" strokeWidth={1.5} />
          <Sparkles className="absolute right-5 top-5 size-4 text-amber-500" />
        </div>

        <p className="mt-9 text-sm font-semibold text-blue-600">ERROR 404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          찾으시는 페이지가 없어요.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
          주소가 잘못되었거나, 페이지가 이동 또는 삭제되었을 수 있습니다.
          <br className="hidden sm:block" /> Relay Work 홈에서 다시 시작해 보세요.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1d4ed8] px-4 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-colors hover:bg-blue-800"
          >
            <Home className="size-4" /> 팀 홈으로 이동
          </Link>
        </div>
      </section>
    </main>
  );
}
