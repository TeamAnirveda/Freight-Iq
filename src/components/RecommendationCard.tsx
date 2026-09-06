type RecommendationCardProps = {
  title: string
  subtitle?: string
  value: string
  details: Array<{ label: string; value: string }>
}

export function RecommendationCard({ title, subtitle, value, details }: RecommendationCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">{title}</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">{value}</h3>
        </div>
      </div>
      {subtitle ? <p className="mt-3 text-sm text-slate-300">{subtitle}</p> : null}
      <div className="mt-5 space-y-3 border-t border-slate-700 pt-4">
        {details.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-300">{item.label}</span>
            <strong className="font-medium text-white">{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}
