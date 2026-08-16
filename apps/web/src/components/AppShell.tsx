import { Bell, Search } from "lucide-react";
import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

export default function AppShell({ title, eyebrow, action, children }: { title: string; eyebrow?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return <div className="min-h-dvh bg-[#f8fafc] text-slate-900 lg:pl-[248px]"><Header /><header className="sticky top-0 z-20 border-b border-slate-200/80 bg-[#f8fafc]/90 px-5 py-3 backdrop-blur lg:px-10"><div className="mx-auto flex max-w-6xl items-center gap-3"><div className="min-w-0"><p className="truncate text-xs font-medium text-blue-600">{eyebrow ?? "리워크 디자인팀"}</p><h1 className="truncate text-base font-semibold">{title}</h1></div><div className="relative ml-auto hidden w-full max-w-sm md:block"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><input className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100" placeholder="전달사항 검색" /></div>{action}<ThemeToggle /><Button variant="ghost" size="icon" className="rounded-xl text-slate-500"><Bell className="size-5" /></Button></div></header><main className="mx-auto max-w-6xl px-5 pb-28 pt-7 sm:px-7 lg:px-10 lg:pb-10 lg:pt-10">{children}</main></div>;
}
