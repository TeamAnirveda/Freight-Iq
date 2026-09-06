type StepIndicatorProps = {
  steps: string[]
}

export function StepIndicator({ steps }: StepIndicatorProps) {
  return (
    <div className="mb-7 flex flex-wrap gap-3">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-white">
              {index + 1}
            </span>
            {step}
          </div>
          {index < steps.length - 1 ? <span className="text-slate-300">→</span> : null}
        </div>
      ))}
    </div>
  )
}
