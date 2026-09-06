type PortCardProps = {
  name: string
  maxDraft: string
  maxLOA: string
  maxBeam: string
  cargoHandling: string
}

export function PortCard({ name, maxDraft, maxLOA, maxBeam, cargoHandling }: PortCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700 ring-1 ring-emerald-100">
          {cargoHandling}
        </span>
      </div>
      <div className="space-y-3 text-sm text-slate-600">
        <div className="flex items-center justify-between"><span>Maximum Draft</span><strong className="text-slate-900">{maxDraft}</strong></div>
        <div className="flex items-center justify-between"><span>Maximum LOA</span><strong className="text-slate-900">{maxLOA}</strong></div>
        <div className="flex items-center justify-between"><span>Maximum Beam</span><strong className="text-slate-900">{maxBeam}</strong></div>
        <div className="flex items-center justify-between"><span>Cargo Handling</span><strong className="text-slate-900">{cargoHandling}</strong></div>
      </div>
    </div>
  )
}
