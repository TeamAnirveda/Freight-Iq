import type { FreightPoint } from '../data/mockData'

type FreightChartProps = {
  data: FreightPoint[]
  height?: number
}

export function FreightChart({ data, height = 220 }: FreightChartProps) {
  const width = 740
  const padding = 24

  const values = data.map((point) => point.value)
  const min = Math.min(...values) - 1
  const max = Math.max(...values) + 1

  const points = data.map((point, index) => {
    const x = padding + (index / (data.length - 1 || 1)) * (width - padding * 2)
    const y = height - padding - ((point.value - min) / (max - min || 1)) * (height - padding * 2)

    return { ...point, x, y }
  })

  const linePoints = points.map((point) => `${point.x},${point.y}`).join(' ')

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-2"><span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-900" />Past 30 Days</span>
          <span className="flex items-center gap-2"><span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-900" />Today</span>
          <span className="flex items-center gap-2"><span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />Next 30 Days</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="h-[220px] w-full overflow-visible">
        {[0, 1, 2, 3].map((line) => {
          const y = padding + (line / 3) * (height - padding * 2)
          return <line key={line} x1={padding} x2={width - padding} y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="4 6" />
        })}

        <polyline fill="none" stroke="#0f172a" strokeWidth="2.5" points={linePoints} strokeLinecap="round" strokeLinejoin="round" />

        {points.map((point) => {
          const isToday = point.label === 'Today'
          const isForecast = point.forecast

          return (
            <g key={point.label}>
              <circle
                cx={point.x}
                cy={point.y}
                r={isToday ? 6.5 : 3.8}
                fill={isToday ? '#f59e0b' : isForecast ? '#10b981' : '#0f172a'}
                stroke={isToday ? '#f8fafc' : 'none'}
                strokeWidth={isToday ? 2.5 : 0}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
