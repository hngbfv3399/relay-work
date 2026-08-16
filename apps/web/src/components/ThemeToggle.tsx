"use client";

import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  return <button onClick={() => document.documentElement.classList.toggle("dark")} className="inline-flex size-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="다크 모드 전환"><Sun className="size-4 dark:hidden" /><Moon className="hidden size-4 dark:block" /></button>;
}
