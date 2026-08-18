"use client";

import {
  Bell,
  ChevronDown,
  House,
  Inbox,
  LogOut,
  Settings2,
  Users,
} from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/features/auth";

const navItems = [
  { label: "홈", icon: House, href: "/" },
  { label: "전달사항", icon: Inbox, badge: "6", href: "/items" },
  { label: "팀원", icon: Users, href: "/members" },
  { label: "팀 설정", icon: Settings2, href: "/settings" },
];

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <>
      <aside className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:inset-y-0 lg:left-0 lg:right-auto lg:w-[248px] lg:border-r lg:border-t-0 lg:px-4 lg:py-6">
        <div className="mb-10 hidden items-center gap-3 px-3 lg:flex">
          <div className="grid size-9 place-items-center rounded-xl bg-[#1e40af] text-lg font-bold text-white shadow-lg shadow-blue-200">
            R
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            Relay Work
          </span>
        </div>

        <div className="mb-6 hidden rounded-xl bg-slate-50 p-3 lg:block">
          <button className="flex w-full items-center justify-between text-left">
            <span>
              <span className="block text-sm font-semibold text-slate-800">
                리워크 디자인팀
              </span>
              <span className="mt-0.5 block text-xs text-slate-500">
                12명의 팀원
              </span>
            </span>
            <ChevronDown className="size-4 text-slate-400" />
          </button>
        </div>

        <nav className="flex items-center justify-around gap-1 lg:flex-col lg:items-stretch lg:justify-start lg:gap-1">
          {navItems.map(({ label, icon: Icon, badge, href }) => (
            <Link
              href={href}
              key={label}
              className="relative flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium text-slate-500 transition-colors hover:bg-blue-50 hover:text-[#1d4ed8] lg:flex-row lg:gap-3 lg:px-3 lg:py-2.5 lg:text-sm"
            >
              <Icon className="size-5" strokeWidth={1.8} />
              <span>{label}</span>
              {badge && (
                <span className="absolute right-2 top-1 rounded-full bg-blue-600 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white lg:static lg:ml-auto">
                  {badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-auto hidden border-t border-slate-100 pt-4 lg:block">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-slate-50">
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-sm font-semibold text-white">
              김
            </span>
            <span>
              <span className="block text-sm font-semibold text-slate-800">
                {user?.name ?? "사용자"}
              </span>
              <span className="block text-xs text-slate-500">데모 사용자</span>
            </span>
            <Bell className="ml-auto size-4 text-slate-400" />
          </button>
          <button
            type="button"
            onClick={signOut}
            className="mt-2 flex h-10 w-full items-center gap-2 rounded-xl px-3 text-sm font-medium text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-700"
          >
            <LogOut className="size-4" />
            로그아웃
          </button>
        </div>
      </aside>
    </>
  );
}
