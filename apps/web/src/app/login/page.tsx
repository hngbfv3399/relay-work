"use client";

import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/features/auth";
import { Button } from "@/components/ui/button";

type DemoUser = {
  id: string;
  name: string;
  role: string;
  description: string;
  initial: string;
  tone: string;
};

const demoUsers: DemoUser[] = [
  {
    id: "user_owner",
    name: "지호",
    role: "팀장",
    description: "팀 설정과 모든 전달사항을 관리할 수 있어요.",
    initial: "지",
    tone: "from-blue-500 to-indigo-600",
  },
  {
    id: "user_minsu",
    name: "민수",
    role: "매장 관리자",
    description: "관리자 대상 전달사항과 팀 운영 기능을 확인해요.",
    initial: "민",
    tone: "from-orange-400 to-rose-500",
  },
  {
    id: "user_sujin",
    name: "수진",
    role: "공지 담당자",
    description: "공지 담당자에게 필요한 전달사항을 확인해요.",
    initial: "수",
    tone: "from-violet-400 to-purple-600",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState(demoUsers[0].id);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await signIn(selectedUserId);
      router.replace("/");
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "로그인에 실패했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-dvh items-center overflow-hidden bg-[#f8fafc] px-5 py-8 sm:px-8 lg:px-12">
      <div className="absolute -left-24 top-12 size-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -right-20 bottom-0 size-80 rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-2xl shadow-blue-950/10 backdrop-blur lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden flex-col justify-between bg-[#173c8b] p-10 text-white lg:flex">
          <div>
            <div className="grid size-11 place-items-center rounded-2xl bg-white text-lg font-bold text-[#173c8b]">
              R
            </div>
            <p className="mt-12 text-sm font-semibold text-blue-200">
              TEAM INBOX
            </p>
            <h1 className="mt-3 max-w-sm text-4xl font-bold leading-tight tracking-tight">
              놓치기 쉬운 일을,
              <br />
              함께 끝까지.
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-6 text-blue-100">
              Relay Work에서 팀의 공지와 요청을 한곳에 모으고, 읽음과 완료
              상태를 분명하게 관리하세요.
            </p>
          </div>

          <ul className="space-y-3 text-sm text-blue-100">
            {[
              "중요한 전달사항을 한눈에 확인",
              "읽음과 완료 상태를 분리해 관리",
              "팀별로 필요한 정보만 공유",
            ].map((text) => (
              <li key={text} className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 shrink-0 text-blue-200" />
                {text}
              </li>
            ))}
          </ul>
        </section>

        <section className="p-6 sm:p-10 lg:p-12">
          <div className="flex items-center gap-3 lg:hidden">
            <div className="grid size-10 place-items-center rounded-xl bg-[#173c8b] text-base font-bold text-white">
              R
            </div>
            <span className="font-semibold tracking-tight text-slate-800">
              Relay Work
            </span>
          </div>

          <div className="mx-auto max-w-sm lg:pt-10">
            <div className="mt-12 lg:mt-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                <Sparkles className="size-3.5" /> 환영합니다
              </span>
              <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
                Relay Work 시작하기
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                데모 환경에서 사용할 사용자를 선택하세요.
              </p>
            </div>

            <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
              <p className="text-sm font-semibold text-slate-700">
                사용자 선택
              </p>
              {demoUsers.map((user) => (
                <label key={user.id} className="block cursor-pointer">
                  <input
                    type="radio"
                    name="demo-user"
                    value={user.id}
                    checked={selectedUserId === user.id}
                    onChange={() => setSelectedUserId(user.id)}
                    className="peer sr-only"
                  />
                  <span className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50/40 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:ring-2 peer-checked:ring-blue-100">
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${user.tone} text-sm font-bold text-white shadow-sm`}
                    >
                      {user.initial}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-800">
                          {user.name}
                        </span>
                        <span className="text-sm text-slate-400">
                          ({user.role})
                        </span>
                      </span>
                      <span className="mt-1 block truncate text-xs text-slate-500">
                        {user.description}
                      </span>
                    </span>
                  </span>
                </label>
              ))}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-xl bg-[#1d4ed8] text-sm font-semibold shadow-lg shadow-blue-200 hover:bg-blue-800"
              >
                {isSubmitting
                  ? "사용자 확인 중..."
                  : "선택한 사용자로 시작하기"}
                {!isSubmitting && <ArrowRight className="size-4" />}
              </Button>
            </form>

            {error && (
              <p className="mt-3 rounded-xl bg-rose-50 px-3 py-2.5 text-center text-xs text-rose-700">
                {error}
              </p>
            )}

            <p className="mt-6 text-center text-xs leading-5 text-slate-400">
              현재는 포트폴리오 시연을 위한 데모 환경입니다.
              <br />
              선택한 사용자의 권한으로 서비스를 둘러볼 수 있습니다.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
