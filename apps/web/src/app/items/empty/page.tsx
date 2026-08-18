import Link from "next/link";
import { Inbox, Plus } from "lucide-react";
import AppShell from "@/components/AppShell";
export default function EmptyItemsPage() {
  return (
    <AppShell title="전달사항">
      <section className="mx-auto flex min-h-[55dvh] max-w-lg flex-col items-center justify-center text-center">
        <span className="grid size-16 place-items-center rounded-3xl bg-blue-50 text-blue-600">
          <Inbox className="size-8" />
        </span>
        <h2 className="mt-6 text-2xl font-bold">아직 전달사항이 없어요.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          첫 전달사항을 등록하고 팀원과 필요한 업무와 공지를 공유해보세요.
        </p>
        <Link
          href="/items/new"
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[#1d4ed8] px-4 text-sm font-semibold text-white"
        >
          <Plus className="size-4" /> 첫 전달사항 작성
        </Link>
      </section>
    </AppShell>
  );
}
