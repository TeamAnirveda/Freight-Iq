import { Header } from '../components/Header'
import { savePreferences, usePreferences, type CurrencyCode, type UnitSystem } from '../utils/preferences'

export function Settings() {
  const preferences = usePreferences()

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    savePreferences({
      ...preferences,
      currency: event.target.value as CurrencyCode,
    })
  }

  const handleUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    savePreferences({
      ...preferences,
      units: event.target.value as UnitSystem,
    })
  }

  return (
    <div>
      <Header title="Settings" subtitle="Prototype preferences for the FreightIQ workflow." />

      <div className="maritime-card rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Preferences</p>

        <div className="mt-5 space-y-5">
          <label className="block text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Currency</span>
            <select value={preferences.currency} onChange={handleCurrencyChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none">
              <option value="USD">USD ($)</option>
              <option value="INR">INR (₹)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CNY">CNY (¥)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="SGD">SGD (S$)</option>
              <option value="AED">AED (د.إ)</option>
            </select>
          </label>

          <label className="block text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Units</span>
            <select value={preferences.units} onChange={handleUnitChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none">
              <option value="Metric">Metric</option>
              <option value="Imperial">Imperial</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  )
}
