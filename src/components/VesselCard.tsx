type VesselCardProps = {
  name: string
  capacity: string
  typicalUse: string
  portFlexibility: string
  isRecommended?: boolean
  className?: string
  style?: React.CSSProperties
}

export function VesselCard({ name, capacity, typicalUse, portFlexibility, isRecommended = false, className, style }: VesselCardProps) {
  return (
    <div className={`maritime-card rounded-2xl p-5 ${isRecommended ? 'maritime-card--recommended' : ''} ${className ?? ''}`} style={style}>
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="text-xl font-semibold text-slate-900">{name}</h3>
        {isRecommended ? (
          <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-700 ring-1 ring-cyan-200/80">
            Recommended
          </span>
        ) : (
          <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600 ring-1 ring-slate-200">
            {capacity}
          </span>
        )}
      </div>
      <div className="space-y-4 text-sm text-slate-600">
        <div>
          <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${isRecommended ? 'text-cyan-700' : 'text-slate-400'}`}>Typical capacity</p>
          <p className="mt-1 font-medium text-slate-800">{capacity}</p>
        </div>
        <div>
          <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${isRecommended ? 'text-cyan-700' : 'text-slate-400'}`}>General use</p>
          <p className="mt-1 text-slate-700">{typicalUse}</p>
        </div>
        <div>
          <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${isRecommended ? 'text-cyan-700' : 'text-slate-400'}`}>Port flexibility</p>
          <p className="mt-1 text-slate-700">{portFlexibility}</p>
        </div>
      </div>
    </div>
  )
}
