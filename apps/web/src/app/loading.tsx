export default function Loading() {
  return (
    <main className="min-h-dvh bg-[#f8fafc] p-6 lg:pl-[280px]">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-12 rounded-xl bg-slate-200" />
        <div className="mt-10 h-8 w-48 rounded bg-slate-200" />
        <div className="mt-6 grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-2xl bg-slate-200" />
          ))}
        </div>
        <div className="mt-8 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-slate-200" />
          ))}
        </div>
      </div>
    </main>
  );
}
