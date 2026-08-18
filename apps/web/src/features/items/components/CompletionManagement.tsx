import { Check, CheckCircle2, CircleAlert, ListChecks } from "lucide-react";
import Link from "next/link";

type CompletionStatus = "INCOMPLETE" | "COMPLETE";

type CompletionManagementProps = {
  completionHref: string;
  status: CompletionStatus;
  onComplete?: () => void;
};

export function CompletionManagement({
  completionHref,
  status,
  onComplete,
}: CompletionManagementProps) {
  if (status === "COMPLETE") {
    return (
      <section className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-5 text-emerald-600" />
          <div>
            <p className="font-semibold text-emerald-800">
              처리가 완료된 전달사항입니다.
            </p>
            <p className="mt-1 text-sm text-emerald-700">
              필요하면 처리 현황에서 대상별 상태를 확인할 수 있어요.
            </p>
          </div>
        </div>
        <Link
          href={completionHref}
          className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 transition-colors hover:bg-emerald-100"
        >
          <ListChecks className="size-4" /> 처리 현황 보기
        </Link>
      </section>
    );
  }

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-rose-100 bg-rose-50 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <CircleAlert className="mt-0.5 size-5 text-rose-600" />
        <div>
          <p className="font-semibold text-rose-800">
            완료 관리가 필요한 전달사항입니다.
          </p>
          <p className="mt-1 text-sm text-rose-700">
            필요한 조치를 마쳤다면 완료 상태로 변경해주세요.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onComplete}
        className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-rose-600 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition-colors hover:bg-rose-700"
      >
        <Check className="size-4" /> 완료로 표시하기
      </button>
      <Link
        href={completionHref}
        className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-rose-700 ring-1 ring-rose-200 transition-colors hover:bg-rose-100"
      >
        <ListChecks className="size-4" /> 처리 현황 보기
      </Link>
    </section>
  );
}
