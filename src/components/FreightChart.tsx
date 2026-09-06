import type { FreightPoint } from '../data/mockData'

type FreightChartProps = {
  data: FreightPoint[]
  height?: number
}

export function FreightChart({ data, height = 220 }: FreightChartProps) {
  const width = 740
  const padding = 26

  const values = data.map((point) => point.value)
  const min = Math.min(...values) - 1
  const max = Math.max(...values) + 1

  const points = data.map((point, index) => {
    const x = padding + (index / (data.length - 1 || 1)) * (width - padding * 2)
    const y = height - padding - ((point.value - min) / (max - min || 1)) * (height - padding * 2)

    return { ...point, x, y }
  })

  const linePoints = points.map((point) => `${point.x},${point.y}`).join(' ')
  const forecastPath = points
    .filter((point) => point.forecast)
    .map((point) => `${point.x},${point.y}`)
    .join(' ')
  const currentPoint = points.find((point) => point.label === 'Today')

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(241,245,249,0.82))] p-4 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.45)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.12),transparent_42%)]" />

      <div className="relative z-10 mb-4 flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-2"><span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-600" />Past 30 Days</span>
          <span className="flex items-center gap-2"><span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-900" />Today</span>
          <span className="flex items-center gap-2"><span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />Next 30 Days</span>
        </div>
      </div>

      <div className="relative z-10">
        {currentPoint ? (
          <div className="absolute right-6 top-14 z-20 rounded-xl border border-cyan-200 bg-white/90 px-2.5 py-1.5 text-right shadow-[0_12px_30px_-20px_rgba(15,23,42,0.7)] backdrop-blur-sm">
            <div className="text-xs font-semibold text-slate-900">${currentPoint.value.toFixed(2)} / MT</div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500">Aug 2024</div>
          </div>
        ) : null}

        <svg viewBox={`0 0 ${width} ${height}`} className="h-[220px] w-full overflow-visible">
          <defs>
            <linearGradient id="freight-line-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
            <linearGradient id="freight-area-gradient" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.18)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0.02)" />
            </linearGradient>
          </defs>

          {[0, 1, 2, 3].map((line) => {
            const y = padding + (line / 3) * (height - padding * 2)
            return <line key={line} x1={padding} x2={width - padding} y1={y} y2={y} stroke="#dfe8f4" strokeDasharray="4 6" />
          })}

          {points.length > 1 ? (
            <polyline
              fill="none"
              stroke="url(#freight-line-gradient)"
              strokeWidth="3.2"
              points={linePoints}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="chart-line"
            />
          ) : null}

          {forecastPath ? (
            <polyline
              fill="none"
              stroke="#14b8a6"
              strokeWidth="2.6"
              strokeDasharray="8 7"
              points={forecastPath}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
            />
          ) : null}

          {points.map((point, index) => {
            const isToday = point.label === 'Today'
            const isForecast = point.forecast

            return (
              <g key={point.label} className="chart-dot" style={{ animationDelay: `${index * 45}ms` }}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isToday ? 7 : 3.6}
                  fill={isToday ? '#f8fafc' : isForecast ? '#10b981' : '#1d4ed8'}
                  stroke={isToday ? '#0ea5e9' : isForecast ? '#10b981' : '#1d4ed8'}
                  strokeWidth={isToday ? 3 : 1.5}
                />
                {isToday ? <circle cx={point.x} cy={point.y} r={10.5} fill="rgba(14,165,233,0.12)" /> : null}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
