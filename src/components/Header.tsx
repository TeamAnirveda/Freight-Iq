type HeaderProps = {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export function Header({ title, subtitle, action }: HeaderProps) {
  return (
    <div className="relative mb-6 overflow-hidden rounded-3xl border border-sky-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.88)_0%,rgba(227,242,255,0.96)_38%,rgba(219,244,249,0.90)_100%)] px-4 py-4 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.55)] backdrop-blur-sm sm:px-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,199,214,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_26%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[-18px] h-24 opacity-90">
        <svg viewBox="0 0 1200 120" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,66 C120,48 205,90 325,72 S520,25 660,62 S905,90 1200,50 L1200,120 L0,120 Z" fill="rgba(34,197,220,0.18)" />
          <path d="M0,80 C180,58 265,100 395,78 S620,46 780,82 S972,104 1200,74" fill="none" stroke="rgba(14,165,233,0.22)" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-700">FreightIQ</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
          {subtitle ? <p className="mt-2 max-w-2xl text-sm text-slate-600">{subtitle}</p> : null}
        </div>
        {action ? <div className="flex-shrink-0">{action}</div> : null}
      </div>
    </div>
  )
}
