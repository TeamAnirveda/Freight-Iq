type HeaderProps = {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export function Header({ title, subtitle, action }: HeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">FreightIQ</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{title}</h1>
        {subtitle ? <p className="mt-2 max-w-2xl text-sm text-slate-500">{subtitle}</p> : null}
      </div>
      {action ? <div className="flex-shrink-0">{action}</div> : null}
    </div>
  )
}
