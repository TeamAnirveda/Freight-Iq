import { ArrowRight, TrendingDown } from 'lucide-react'
import { Header } from '../components/Header'
import { FreightChart } from '../components/FreightChart'
import { StatCard } from '../components/StatCard'
import { cargoRequirements, freightHistory, marketMetrics } from '../data/mockData'
import { formatCurrencyRate, parseNumericValue, usePreferences } from '../utils/preferences'

export function Overview() {
  const preferences = usePreferences()

  const displayMetrics = marketMetrics.map((metric) => {
    if (metric.label === 'Current Market' || metric.label === '7-Day Forecast') {
      const numericValue = parseNumericValue(metric.value)
      return {
        ...metric,
        value: formatCurrencyRate(numericValue, preferences.currency, preferences.units),
      }
    }

    return metric
  })

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-[-32px] h-56 opacity-80">
        <svg viewBox="0 0 1200 200" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,120 C170,40 350,155 540,110 S860,44 1200,120" fill="none" stroke="rgba(34,211,238,0.18)" strokeWidth="2" />
          <path d="M0,148 C190,84 376,170 560,129 S960,68 1200,142" fill="none" stroke="rgba(56,189,248,0.13)" strokeWidth="2" />
        </svg>
      </div>

      <Header
        title="Freight Intelligence"
        subtitle="Make proactive chartering decisions using freight forecasts, vessel optimization and port feasibility."
      />

      <section className="overview-hero-shell mb-6" aria-label="Maritime hero banner">
        <div className="overview-hero" />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {displayMetrics.map((metric, index) => (
          <StatCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            style={{ animationDelay: `${index * 70}ms` }}
          />
        ))}
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.7fr,0.7fr]">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.5)] backdrop-blur-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Freight Market Outlook</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Historical freight rates to forecast</h2>
            </div>
            <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">Past 30 Days | Today | Next 30 Days</div>
          </div>
          <FreightChart data={freightHistory} />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.5)]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            <TrendingDown size={14} />
            Market outlook
          </div>
          <p className="mt-4 text-lg font-semibold text-slate-900">Freight rates are expected to soften over the next 2–3 weeks based on the current market trend.</p>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Sentiment</span>
              <span className="font-medium text-rose-600">Weakening</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-slate-200">
              <div className="h-2 w-[62%] rounded-full bg-rose-400" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.5)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Recent Cargo Requirements</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">Live mock requirements</h2>
          </div>
          <button type="button" className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
            View all
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-[720px] text-left text-sm md:min-w-full">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Cargo</th>
                <th className="px-4 py-3 font-medium">Volume</th>
                <th className="px-4 py-3 font-medium">Route</th>
                <th className="px-4 py-3 font-medium">Vessel</th>
                <th className="px-4 py-3 font-medium">Period</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {cargoRequirements.map((requirement) => (
                <tr key={`${requirement.cargo}-${requirement.period}`} className="border-t border-slate-200 bg-white">
                  <td className="px-4 py-3 font-medium text-slate-900">{requirement.cargo}</td>
                  <td className="px-4 py-3 text-slate-600">{requirement.quantity}</td>
                  <td className="px-4 py-3 text-slate-600">{requirement.route}</td>
                  <td className="px-4 py-3 text-slate-600">{requirement.vessel}</td>
                  <td className="px-4 py-3 text-slate-600">{requirement.period}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium ${requirement.status === 'Analyzed' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100' : 'bg-amber-50 text-amber-700 ring-1 ring-amber-100'}`}>
                      {requirement.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
