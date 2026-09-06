import { Header } from '../components/Header'

export function Settings() {
  return (
    <div>
      <Header title="Settings" subtitle="Prototype preferences for the FreightIQ workflow." />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Preferences</p>

        <div className="mt-5 space-y-5">
          <label className="block text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Currency</span>
            <select defaultValue="USD" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none">
              <option>USD</option>
              <option>INR</option>
            </select>
          </label>

          <label className="block text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Units</span>
            <select defaultValue="Metric" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none">
              <option>Metric</option>
              <option>Imperial</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  )
}
