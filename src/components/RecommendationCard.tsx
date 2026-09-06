type RecommendationCardProps = {
  title: string
  subtitle?: string
  value: string
  details: Array<{ label: string; value: string }>
  className?: string
  style?: React.CSSProperties
}

export function RecommendationCard({ title, subtitle, value, details, className, style }: RecommendationCardProps) {
  return (
    <div className={`maritime-card maritime-card--recommended rounded-2xl p-6 ${className ?? ''}`} style={style}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-700">{title}</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{value}</h3>
        </div>
      </div>
      {subtitle ? <p className="mt-3 text-sm text-slate-700">{subtitle}</p> : null}
      <div className="mt-5 space-y-3 border-t border-slate-200 pt-4">
        {details.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-500">{item.label}</span>
            <strong className="font-semibold text-slate-900">{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}
