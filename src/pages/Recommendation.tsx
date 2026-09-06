import { Link } from 'react-router-dom'
import { CheckCircle2, Clock3, Ship, TrendingUp } from 'lucide-react'
import { Header } from '../components/Header'
import { RecommendationCard } from '../components/RecommendationCard'
import { StepIndicator } from '../components/StepIndicator'
import { StatusBadge } from '../components/StatusBadge'
import {
  getRecommendedVessel,
  getRouteForecast,
  getSavedRequirement,
  portReferences,
} from '../data/mockData'
import { formatCurrencyRate, formatMass, parseNumericValue, usePreferences } from '../utils/preferences'

function formatDate(value: string) {
  if (!value) {
    return 'TBD'
  }

  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function Recommendation() {
  const requirement = getSavedRequirement()
  const preferences = usePreferences()

  if (!requirement) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">No active cargo requirement</h2>
        <p className="mt-3 text-slate-600">Create a requirement to see the recommendation workflow.</p>
        <Link to="/requirement" className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
          Create Requirement
        </Link>
      </div>
    )
  }

  const route = `${requirement.origin} → ${requirement.destination}`
  const vessel = getRecommendedVessel(requirement.quantity)
  const forecast = getRouteForecast(requirement)
  const port = portReferences.find((item) => item.name === requirement.destination)
  const loadingWindow = `${formatDate(requirement.startDate)} – ${formatDate(requirement.endDate)}`
  const displayCurrent = formatCurrencyRate(parseNumericValue(forecast.current), preferences.currency, preferences.units)
  const displayExpected = formatCurrencyRate(parseNumericValue(forecast.expected), preferences.currency, preferences.units)
  const displayQuantity = formatMass(Number(requirement.quantity), preferences.units)

  const strategyMap = {
    'Spot Voyage': {
      label: 'SPOT',
      description: 'Current market fixing with short execution timing',
      recommended: 'Spot',
      summary: 'The selected spot window offers flexibility while market exposure remains moderate.',
      expectedRange: '$18.10–$18.80 / MT',
      fixingWindow: loadingWindow,
    },
    'Short-Term': {
      label: 'SHORT-TERM',
      description: 'Multiple voyages over a shorter period',
      recommended: 'Short-Term',
      summary: 'Short-term coverage is preferred because the selected cargo profile and route fit the market window well.',
      expectedRange: '$17.50–$18.20 / MT',
      fixingWindow: loadingWindow,
    },
    'Mid-Term': {
      label: 'MID-TERM',
      description: 'Multiple voyages over a longer period',
      recommended: 'Mid-Term',
      summary: 'A mid-term arrangement reduces repeated fixing risk while maintaining route continuity.',
      expectedRange: '$17.30–$18.00 / MT',
      fixingWindow: loadingWindow,
    },
    'No Preference': {
      label: 'SHORT-TERM',
      description: 'Multiple voyages over a shorter period',
      recommended: 'Short-Term',
      summary: 'Without a firm preference, the current market outlook supports short-term coverage.',
      expectedRange: '$17.60–$18.20 / MT',
      fixingWindow: loadingWindow,
    },
  }

  const strategy = strategyMap[requirement.contractPreference as keyof typeof strategyMap] ?? strategyMap['Short-Term']
  const steps = ['Freight Forecast', 'Vessel Optimization', 'Port Feasibility', 'Chartering Strategy']

  const finalDecisionTitle = requirement.contractPreference === 'Spot Voyage' ? 'FIX WITHIN WINDOW' : 'WAIT FOR MARKET ENTRY'

  return (
    <div>
      <Header title="Chartering Recommendation" subtitle="Decision support based on the active cargo requirement and route profile." />

      <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Requirement</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{requirement.cargoType}</span>
              <span>{displayQuantity}</span>
              <span>{route}</span>
              <span>{loadingWindow}</span>
            </div>
          </div>
          <StatusBadge label="Completed" tone="success" />
        </div>
      </div>

      <StepIndicator steps={steps} />

      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Section A</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Freight Market Outlook</h2>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr,0.7fr]">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-slate-500">Current Freight</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{displayCurrent}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Expected Freight</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{displayExpected}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Forecast Change</p>
                  <p className="mt-2 text-2xl font-semibold text-rose-600">{forecast.change}</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Historical → Current → Forecast</span>
                </div>
                <div className="flex h-28 items-end gap-2">
                  {[48, 56, 60, 52, 70, 78, 92, 82, 74, 62, 70, 60, 58].map((h, idx) => (
                    <div key={idx} className="flex flex-1 flex-col items-center gap-2">
                      <div className={`w-full rounded-t-xl ${idx < 7 ? 'bg-slate-300' : 'bg-sky-400'}`} style={{ height: `${h}%` }} />
                      <span className="text-[9px] text-slate-400">{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                <TrendingUp size={14} />
                Recommended Market Entry
              </div>
              <p className="mt-4 text-lg font-medium text-slate-900">{forecast.recommendation}</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Section B</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Recommended Vessel</h2>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.7fr,1.3fr]">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                <Ship size={16} />
                Vessel type
              </div>
              <div className="mt-5 text-3xl font-semibold tracking-[0.12em] text-slate-900">{vessel.type}</div>
              <div className="mt-6">
                <p className="text-sm text-slate-500">Recommended Capacity</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{vessel.capacity}</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-[520px] text-left text-sm md:min-w-full">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">Vessel Type</th>
                    <th className="px-4 py-3 font-medium">Capacity</th>
                    <th className="px-4 py-3 font-medium">Port Fit</th>
                    <th className="px-4 py-3 font-medium">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: 'Handysize', capacity: '30,000 DWT', portFit: 'Good', recommendation: 'Possible' },
                    { type: 'Supramax', capacity: '55,000 DWT', portFit: 'Excellent', recommendation: vessel.type === 'Supramax' ? 'Recommended' : 'Possible' },
                    { type: 'Panamax', capacity: '75,000 DWT', portFit: 'Good', recommendation: vessel.type === 'Panamax' ? 'Recommended' : 'Possible' },
                    { type: 'Capesize', capacity: '150,000 DWT', portFit: 'Not suitable', recommendation: 'Not suitable' },
                  ].map((row) => (
                    <tr key={row.type} className="border-t border-slate-200 bg-white">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.type}</td>
                      <td className="px-4 py-3 text-slate-600">{row.capacity}</td>
                      <td className="px-4 py-3 text-slate-600">{row.portFit}</td>
                      <td className="px-4 py-3 text-slate-600">{row.recommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-5 text-sm text-slate-700">{vessel.type} provides the best balance between cargo quantity and port feasibility for this shipment profile.</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Section C</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Port Feasibility</h2>
            </div>
            <StatusBadge label="Suitable" tone="success" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Loading Port</p>
              <p className="mt-3 text-xl font-semibold text-slate-900">{requirement.origin}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Discharge Port</p>
              <p className="mt-3 text-xl font-semibold text-slate-900">{requirement.destination}</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {[
              { label: 'Draft', status: port ? 'Suitable' : 'Review' },
              { label: 'LOA', status: port ? 'Suitable' : 'Review' },
              { label: 'Beam', status: port ? 'Suitable' : 'Review' },
              { label: 'Cargo Handling', status: port?.cargoHandling === 'High' ? 'Excellent' : 'Suitable' },
            ].map((constraint) => (
              <div key={constraint.label} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                <span className="font-medium">{constraint.label}</span>
                <span className="inline-flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 size={16} />
                  {constraint.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="text-sm text-slate-500">Port Fit</span>
            <span className="text-base font-semibold text-emerald-700">Suitable</span>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Section D</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Chartering Strategy</h2>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              { label: 'SPOT', description: 'Current market fixing' },
              { label: 'SHORT-TERM', description: 'Multiple voyages over a shorter period' },
              { label: 'MID-TERM', description: 'Multiple voyages over a longer period' },
            ].map((option) => {
              const highlighted = option.label === strategy.label
              return (
                <div key={option.label} className={`rounded-2xl border p-4 ${highlighted ? 'border-slate-900 bg-slate-900 text-white shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${highlighted ? 'text-slate-300' : 'text-slate-400'}`}>{option.label}</span>
                    {highlighted ? <StatusBadge label="Recommended" tone="neutral" /> : null}
                  </div>
                  <p className={`mt-3 text-sm ${highlighted ? 'text-slate-300' : 'text-slate-600'}`}>{option.description}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              <Clock3 size={14} />
              Recommended
            </div>
            <div className="mt-3 text-2xl font-semibold text-slate-900">{strategy.recommended}</div>
            <p className="mt-3 text-sm text-slate-700">{strategy.summary}</p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Expected Freight Range</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{strategy.expectedRange}</p>
              </div>
              <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Recommended Fixing Window</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{strategy.fixingWindow}</p>
              </div>
            </div>
          </div>
        </section>

        <RecommendationCard
          title="FreightIQ Recommendation"
          value={finalDecisionTitle}
          subtitle="Recommendation shown using simulated data for demonstration."
          details={[
            { label: 'Recommended Vessel', value: vessel.type },
            { label: 'Route', value: route },
            { label: 'Strategy', value: strategy.recommended },
            { label: 'Expected Freight', value: displayExpected },
            { label: 'Recommended Fixing Window', value: strategy.fixingWindow },
          ]}
        />
      </div>
    </div>
  )
}
