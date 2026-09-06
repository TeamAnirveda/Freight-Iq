type VesselCardProps = {
  name: string
  capacity: string
  typicalUse: string
  portFlexibility: string
}

export function VesselCard({ name, capacity, typicalUse, portFlexibility }: VesselCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900">{name}</h3>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
          {capacity}
        </span>
      </div>
      <div className="space-y-4 text-sm text-slate-600">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Typical capacity</p>
          <p className="mt-1 font-medium text-slate-800">{capacity}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">General use</p>
          <p className="mt-1 text-slate-700">{typicalUse}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Port flexibility</p>
          <p className="mt-1 text-slate-700">{portFlexibility}</p>
        </div>
      </div>
    </div>
  )
}
