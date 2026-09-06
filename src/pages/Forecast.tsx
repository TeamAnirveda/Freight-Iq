import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { FreightChart } from '../components/FreightChart'
import { freightHistory, getRecommendedVessel, getRouteForecast, getSavedRequirement } from '../data/mockData'
import { formatCurrencyRate, parseNumericValue, usePreferences } from '../utils/preferences'

export function Forecast() {
  const requirement = getSavedRequirement()
  const preferences = usePreferences()

  if (!requirement) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">No active cargo requirement</h2>
        <p className="mt-3 text-slate-600">Create a requirement to see route-specific freight forecast logic.</p>
        <Link to="/requirement" className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
          Create Requirement
        </Link>
      </div>
    )
  }

  const route = `${requirement.origin} → ${requirement.destination}`
  const vessel = getRecommendedVessel(requirement.quantity)
  const forecast = getRouteForecast(requirement)
  const displayCurrent = formatCurrencyRate(parseNumericValue(forecast.current), preferences.currency, preferences.units)
  const displayExpected = formatCurrencyRate(parseNumericValue(forecast.expected), preferences.currency, preferences.units)

  return (
    <div>
      <Header
        title="Freight Forecast"
        subtitle={`${route} · Cargo: ${requirement.cargoType} · Recommended Vessel: ${vessel.type}`}
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center gap-4">
          <div className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Route</span>
            <div className="w-52 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800">{route}</div>
          </div>

          <div className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Vessel</span>
            <div className="w-40 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800">{vessel.type}</div>
          </div>

          <div className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Forecast Horizon</span>
            <div className="w-32 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800">30 Days</div>
          </div>
        </div>

        <FreightChart data={freightHistory} />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Current Market</p>
          <p className="mt-4 text-2xl font-semibold text-slate-900">{displayCurrent}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Forecast</p>
          <p className="mt-4 text-2xl font-semibold text-slate-900">{displayExpected}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Expected Change</p>
          <p className="mt-4 text-2xl font-semibold text-rose-600">{forecast.change}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Market Outlook</p>
          <p className="mt-4 text-2xl font-semibold text-slate-900">Softening</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Market Drivers</p>
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {[
            ['Cargo Demand', 'High ↑'],
            ['Vessel Supply', 'Moderate →'],
            ['Port Congestion', 'Low ↓'],
            ['Seasonal Demand', 'High ↑'],
            ['Bunker Costs', 'Moderate →'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{label}</p>
              <p className="mt-3 text-lg font-semibold text-slate-900">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <p className="text-sm text-slate-500">Forecast commentary</p>
        <p className="mt-3 text-lg font-medium text-slate-900">{forecast.recommendation}</p>
      </div>
    </div>
  )
}
