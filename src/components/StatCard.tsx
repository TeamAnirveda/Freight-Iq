type StatCardProps = {
  label: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  className?: string
  style?: React.CSSProperties
}

export function StatCard({ label, value, change, trend = 'neutral', className, style }: StatCardProps) {
  const tone =
    trend === 'down'
      ? 'bg-rose-50 text-rose-700 ring-rose-100'
      : trend === 'up'
        ? 'bg-emerald-50 text-emerald-700 ring-emerald-100'
        : 'bg-sky-50 text-sky-700 ring-sky-100'

  return (
    <div className={`maritime-card maritime-card--strong group relative rounded-2xl p-5 ${className ?? ''}`} style={style}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,199,214,0.12),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-14 w-20 opacity-60">
        <svg viewBox="0 0 120 60" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,35 C24,28 35,42 62,32 S99,22 120,30" fill="none" stroke="rgba(34,197,220,0.32)" strokeWidth="2" />
          <path d="M0,45 C28,38 42,52 65,42 S103,32 120,44" fill="none" stroke="rgba(14,165,233,0.18)" strokeWidth="1.6" />
        </svg>
      </div>

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-slate-500">{label}</p>
          {change ? (
            <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ring-1 ${tone}`}>
              {change}
            </span>
          ) : null}
        </div>
        <div className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">{value}</div>
      </div>
    </div>
  )
}
