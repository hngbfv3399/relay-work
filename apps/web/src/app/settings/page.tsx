import {
  ChevronRight,
  FolderKanban,
  ShieldCheck,
  SlidersHorizontal,
  UsersRound,
} from "lucide-react";
import AppShell from "@/components/AppShell";

const settings = [
  {
    icon: SlidersHorizontal,
    title: "팀 정보",
    text: "팀 이름과 설명을 수정합니다.",
  },
  {
    icon: FolderKanban,
    title: "카테고리",
    text: "공지, 요청 등 전달사항 분류를 관리합니다.",
  },
  {
    icon: ShieldCheck,
    title: "역할 및 권한",
    text: "팀원의 관리 권한을 설정합니다.",
  },
  {
    icon: UsersRound,
    title: "팀원 관리",
    text: "팀원을 추가하거나 역할을 변경합니다.",
  },
];
export default function SettingsPage() {
  return (
    <AppShell title="팀 설정">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">팀 설정</h2>
        <p className="mt-2 text-sm text-slate-500">
          리워크 디자인팀의 운영 정보를 관리합니다.
        </p>
      </div>
      <section className="mt-7 max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {settings.map(({ icon: Icon, title, text }) => (
          <button
            key={title}
            className="group flex w-full items-center gap-4 border-b border-slate-100 p-4 text-left last:border-0 hover:bg-slate-50 sm:p-5"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-700">
              <Icon className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-slate-800">
                {title}
              </span>
              <span className="mt-0.5 block text-sm text-slate-500">
                {text}
              </span>
            </span>
            <ChevronRight className="size-5 text-slate-300 transition-transform group-hover:translate-x-1" />
          </button>
        ))}
      </section>
      <section className="mt-7 max-w-3xl rounded-2xl border border-rose-100 bg-rose-50/50 p-5">
        <h3 className="font-semibold text-rose-800">팀 관리 안내</h3>
        <p className="mt-1 text-sm leading-relaxed text-rose-700">
          팀 삭제는 전달사항과 팀원 데이터에 영향을 주므로 현재 MVP 화면에서는
          제공하지 않습니다. 필요할 경우 별도 확인 절차를 포함한 관리 기능으로
          설계하는 것을 권장합니다.
        </p>
      </section>
    </AppShell>
  );
}
