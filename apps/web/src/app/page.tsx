"use client";

import {
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  CircleAlert,
  Ellipsis,
  Filter,
  Megaphone,
  Plus,
  Search,
  Star,
} from "lucide-react";
import Link from "next/link";

import Header from "@/components/Header";
import { useAuth } from "@/features/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const items = [
  {
    category: "요청",
    tone: "blue",
    title: "행사 부스 운영 인력 확인",
    body: "금주 금요일 행사 운영 가능 시간을 확인해 주세요.",
    author: "이수진",
    time: "10분 전",
    important: true,
    unread: true,
    completion: "미완료",
  },
  {
    category: "공지",
    tone: "violet",
    title: "8월 정기 회의 일정 안내",
    body: "이번 달 전체 회의는 8월 22일 목요일 오후 3시에 진행합니다.",
    author: "김지호",
    time: "2시간 전",
    unread: true,
  },
  {
    category: "이슈",
    tone: "rose",
    title: "랜딩 페이지 모바일 여백 점검",
    body: "375px 해상도에서 하단 CTA의 여백을 다시 확인해주세요.",
    author: "박민수",
    time: "어제",
    completion: "완료",
  },
];

const tone = {
  blue: "bg-blue-50 text-blue-700",
  violet: "bg-violet-50 text-violet-700",
  rose: "bg-rose-50 text-rose-700",
};

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-dvh bg-[#f8fafc] text-slate-900 lg:pl-[248px]">
      <Header />
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-[#f8fafc]/90 px-5 py-3 backdrop-blur lg:px-10">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="grid size-9 place-items-center rounded-xl bg-[#1e40af] text-base font-bold text-white lg:hidden">
            R
          </div>
          <div className="lg:hidden">
            <p className="text-xs text-slate-500">리워크 디자인팀</p>
            <h1 className="text-sm font-semibold">팀 홈</h1>
          </div>
          <div className="relative ml-auto hidden w-full max-w-sm md:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              placeholder="전달사항 검색"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl text-slate-500"
          >
            <Bell className="size-5" />
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-28 pt-7 sm:px-7 lg:px-10 lg:pb-10 lg:pt-10">
        <section className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-sm font-medium text-blue-600">
              월요일, 8월 17일
            </p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              안녕하세요, {user?.name}님 <span aria-hidden>👋</span>
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              오늘 확인하고 처리할 전달사항을 모아봤어요.
            </p>
          </div>
          <Link
            href="/items/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1d4ed8] px-4 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-colors hover:bg-blue-800"
          >
            <Plus className="size-4" /> 전달사항 작성
          </Link>
        </section>

        <section className="grid grid-cols-3 gap-3 sm:gap-4">
          <Stat
            label="읽지 않음"
            value="6"
            icon={Bell}
            className="text-blue-600"
          />
          <Stat label="중요" value="3" icon={Star} className="text-amber-500" />
          <Stat
            label="미완료"
            value="4"
            icon={CircleAlert}
            className="text-rose-500"
          />
        </section>

        <section className="mt-9 grid gap-7 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">확인이 필요한 전달사항</h3>
                <p className="mt-1 text-sm text-slate-500">
                  최근 업데이트된 항목부터 표시됩니다.
                </p>
              </div>
              <Link
                href="/items"
                className="hidden h-10 items-center gap-1 rounded-xl px-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50 sm:inline-flex"
              >
                전체 보기 <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {items.map((item) => (
                <Link
                  href="/items/sample"
                  key={item.title}
                  className="group relative block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5"
                >
                  {item.unread && (
                    <span className="absolute right-4 top-5 size-2 rounded-full bg-blue-600" />
                  )}
                  <div className="mb-3 flex items-center gap-2 pr-4">
                    <Badge
                      className={`${tone[item.tone as keyof typeof tone]} border-0`}
                    >
                      {item.category}
                    </Badge>
                    {item.important && (
                      <span className="flex items-center gap-1 text-xs font-medium text-amber-600">
                        <Star className="size-3 fill-current" /> 중요
                      </span>
                    )}
                    {item.completion && (
                      <span
                        className={`ml-auto rounded-full px-2 py-0.5 text-xs font-medium ${item.completion === "완료" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}
                      >
                        {item.completion === "완료" && (
                          <Check className="mr-0.5 inline size-3" />
                        )}
                        {item.completion}
                      </span>
                    )}
                  </div>
                  <h4 className="pr-4 text-base font-semibold text-slate-800">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 line-clamp-1 text-sm text-slate-500">
                    {item.body}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                    <span>
                      {item.author} · {item.time}
                    </span>
                    <ChevronRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/items"
              className="mt-4 flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 sm:hidden"
            >
              전체 전달사항 보기
            </Link>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl bg-[#173c8b] p-5 text-white">
              <Megaphone className="mb-5 size-5 text-blue-200" />
              <p className="text-sm text-blue-100">이번 주 팀 공지</p>
              <h3 className="mt-1 text-lg font-semibold leading-snug">
                금요일은 행사 준비 집중일입니다.
              </h3>
              <button className="mt-5 flex items-center gap-1 text-sm font-medium text-blue-100 hover:text-white">
                공지 확인 <ChevronRight className="size-4" />
              </button>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">빠른 필터</h3>
                <Filter className="size-4 text-slate-400" />
              </div>
              <div className="flex flex-wrap gap-2">
                {["미읽음", "중요", "미완료", "내가 작성"].map((filter) => (
                  <button
                    key={filter}
                    className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="hidden rounded-2xl border border-slate-200 bg-white p-5 lg:block">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">팀원</h3>
                <Ellipsis className="size-4 text-slate-400" />
              </div>
              <div className="mt-4 flex -space-x-2">
                <span className="grid size-8 place-items-center rounded-full border-2 border-white bg-violet-400 text-xs font-bold text-white">
                  김
                </span>
                <span className="grid size-8 place-items-center rounded-full border-2 border-white bg-rose-400 text-xs font-bold text-white">
                  이
                </span>
                <span className="grid size-8 place-items-center rounded-full border-2 border-white bg-amber-400 text-xs font-bold text-white">
                  박
                </span>
                <span className="grid size-8 place-items-center rounded-full border-2 border-white bg-slate-100 text-xs font-semibold text-slate-500">
                  +9
                </span>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  className,
}: {
  label: string;
  value: string;
  icon: typeof Bell;
  className: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500 sm:text-sm">
          {label}
        </span>
        <span
          className={`grid size-8 place-items-center rounded-xl bg-slate-50 ${className}`}
        >
          <Icon className="size-4" />
        </span>
      </div>
      <strong className="text-2xl font-bold tracking-tight sm:text-3xl">
        {value}
      </strong>
      <span className="ml-1 text-xs text-slate-400 sm:text-sm">건</span>
    </div>
  );
}
