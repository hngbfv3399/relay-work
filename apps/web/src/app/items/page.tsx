import Link from "next/link";
import {
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Filter,
  Inbox,
  Plus,
  Search,
  Star,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";

const items = [
  [
    "요청",
    "행사 부스 운영 인력 확인",
    "금주 금요일 행사 운영 가능 시간을 확인해 주세요.",
    "이수진",
    "10분 전",
    "미완료",
    true,
  ],
  [
    "공지",
    "8월 정기 회의 일정 안내",
    "이번 달 전체 회의는 8월 22일 목요일 오후 3시에 진행합니다.",
    "김지호",
    "2시간 전",
    "",
    false,
  ],
  [
    "이슈",
    "랜딩 페이지 모바일 여백 점검",
    "375px 해상도에서 하단 CTA의 여백을 다시 확인해주세요.",
    "박민수",
    "어제",
    "완료",
    false,
  ],
  [
    "일정",
    "브랜드 촬영 레퍼런스 취합",
    "내일 오전까지 무드보드에 참고 이미지를 추가해주세요.",
    "김지호",
    "8월 15일",
    "미완료",
    false,
  ],
] as const;
const styles: Record<string, string> = {
  요청: "bg-blue-50 text-blue-700",
  공지: "bg-violet-50 text-violet-700",
  이슈: "bg-rose-50 text-rose-700",
  일정: "bg-amber-50 text-amber-700",
};

export default function ItemsPage() {
  return (
    <AppShell
      title="전달사항"
      action={
        <Link
          href="/items/new"
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#1d4ed8] px-3 text-sm font-semibold text-white shadow-md shadow-blue-200 hover:bg-blue-800"
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">작성</span>
        </Link>
      }
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">모든 전달사항</h2>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
              24
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            팀에 공유된 내용과 요청을 확인하세요.
          </p>
        </div>
        <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600">
          <Filter className="size-4" /> 필터
        </button>
      </div>

      <section className="mt-7 grid gap-3 sm:grid-cols-3">
        <SummaryCard
          icon={Inbox}
          label="전체 전달사항"
          value="24"
          detail="이번 주 8건 등록"
          tone="text-blue-600 bg-blue-50"
        />
        <SummaryCard
          icon={CircleAlert}
          label="확인이 필요해요"
          value="6"
          detail="아직 읽지 않은 항목"
          tone="text-rose-600 bg-rose-50"
        />
        <SummaryCard
          icon={CheckCircle2}
          label="처리 완료"
          value="18"
          detail="이번 주 완료율 75%"
          tone="text-emerald-600 bg-emerald-50"
        />
      </section>

      <div className="mt-7 flex gap-2 overflow-x-auto pb-1">
        {[
          "전체",
          "미읽음",
          "중요",
          "미완료",
          "공지",
          "요청",
          "일정",
          "이슈",
        ].map((x, i) => (
          <button
            key={x}
            className={`shrink-0 rounded-xl px-3 py-2 text-sm font-medium ${i === 0 ? "bg-[#173c8b] text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"}`}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="relative mt-5 md:hidden">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input
          className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 text-sm"
          placeholder="전달사항 검색"
        />
      </div>
      <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {items.map(
          ([category, title, body, author, time, status, important]) => (
            <Link
              href="/items/sample"
              key={title}
              className="group relative flex gap-3 border-b border-slate-100 p-4 transition-all last:border-b-0 hover:z-10 hover:bg-blue-50/40 sm:p-5"
            >
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-blue-600 ring-4 ring-blue-50" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={`${styles[category]} border-0`}>
                    {category}
                  </Badge>
                  {important && (
                    <span className="flex items-center gap-1 text-xs font-medium text-amber-600">
                      <Star className="size-3 fill-current" /> 중요
                    </span>
                  )}
                  {status && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${status === "완료" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}
                    >
                      {status === "완료" && (
                        <Check className="mr-0.5 inline size-3" />
                      )}
                      {status}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-semibold text-slate-800 transition-colors group-hover:text-blue-800">
                  {title}
                </h3>
                <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                  {body}
                </p>
                <p className="mt-3 text-xs text-slate-400">
                  {author} · {time}
                </p>
              </div>
              <ChevronRight className="mt-8 size-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1" />
            </Link>
          ),
        )}
      </section>
    </AppShell>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: typeof Inbox;
  label: string;
  value: string;
  detail: string;
  tone: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <strong className="mt-2 block text-2xl font-bold tracking-tight text-slate-900">
            {value}
            <span className="ml-1 text-sm font-medium text-slate-400">건</span>
          </strong>
        </div>
        <span className={`grid size-9 place-items-center rounded-xl ${tone}`}>
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-3 text-xs text-slate-400">{detail}</p>
    </article>
  );
}
