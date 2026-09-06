type StatusBadgeProps = {
  label: string
  tone?: 'success' | 'neutral' | 'warning' | 'danger'
}

export function StatusBadge({ label, tone = 'success' }: StatusBadgeProps) {
  const styles = {
    success: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
    warning: 'bg-amber-50 text-amber-700 ring-amber-100',
    danger: 'bg-rose-50 text-rose-700 ring-rose-100',
  }

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ring-1 shadow-sm ${styles[tone]}`}>
      {label}
    </span>
  )
}
