type RequirementSummaryProps = {
  cargo: string
  quantity: string
  route: string
  vessel: string
  period: string
}

export function RequirementSummary({ cargo, quantity, route, vessel, period }: RequirementSummaryProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Requirement Summary</span>
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-100">
          Active
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-5">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Cargo</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{cargo}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Volume</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{quantity}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Route</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{route}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Vessel</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{vessel}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Timing</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{period}</p>
        </div>
      </div>
    </div>
  )
}
