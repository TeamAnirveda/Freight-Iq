type StatCardProps = {
  label: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
}

export function StatCard({ label, value, change, trend = 'neutral' }: StatCardProps) {
  const tone =
    trend === 'down'
      ? 'bg-rose-50 text-rose-700 ring-rose-100'
      : trend === 'up'
        ? 'bg-emerald-50 text-emerald-700 ring-emerald-100'
        : 'bg-slate-100 text-slate-700 ring-slate-200'

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
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
  )
}
