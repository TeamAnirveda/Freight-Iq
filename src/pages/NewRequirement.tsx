import { type ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import {
  contractOptions,
  defaultRequirement,
  destinationOptions,
  getSavedRequirement,
  normalizeRequirement,
  originOptions,
  saveRequirement,
  shipmentOptions,
  type RequirementState,
} from '../data/mockData'

export function NewRequirement() {
  const navigate = useNavigate()
  const [form, setForm] = useState<RequirementState>(() => getSavedRequirement() ?? defaultRequirement)

  const handleChange = (field: keyof RequirementState) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    saveRequirement(normalizeRequirement(form))
    navigate('/recommendation')
  }

  return (
    <div>
      <Header
        title="New Cargo Requirement"
        subtitle="Tell us what you need to move. FreightIQ will evaluate the market, vessel and port constraints."
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-8">
          <section>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Section 1</span>
              <h2 className="text-lg font-semibold text-slate-900">Cargo</h2>
            </div>

            <div className="max-w-md">
              <label className="block text-sm text-slate-600">
                <span className="mb-2 block font-medium text-slate-700">Total Quantity</span>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-slate-300 focus-within:bg-white">
                  <input value={form.quantity} onChange={handleChange('quantity')} className="w-full bg-transparent text-slate-800 outline-none" />
                  <span className="text-sm font-medium text-slate-500">MT</span>
                </div>
              </label>
            </div>

            <div className="mt-5">
              <label className="block text-sm text-slate-600">
                <span className="mb-2 block font-medium text-slate-700">Shipment Preference</span>
                <select value={form.shipmentPreference} onChange={handleChange('shipmentPreference')} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none transition focus:border-slate-300 focus:bg-white">
                  {shipmentOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              {form.shipmentPreference === 'Multiple Shipments' ? (
                <div className="mt-5 max-w-md">
                  <label className="block text-sm text-slate-600">
                    <span className="mb-2 block font-medium text-slate-700">Number of Shipments</span>
                    <input value={form.numberOfShipments} onChange={handleChange('numberOfShipments')} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none transition focus:border-slate-300 focus:bg-white" />
                  </label>
                </div>
              ) : null}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Section 2</span>
              <h2 className="text-lg font-semibold text-slate-900">Trade Route</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm text-slate-600">
                <span className="mb-2 block font-medium text-slate-700">Origin</span>
                <select value={form.origin} onChange={handleChange('origin')} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none transition focus:border-slate-300 focus:bg-white">
                  {originOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm text-slate-600">
                <span className="mb-2 block font-medium text-slate-700">Destination</span>
                <select value={form.destination} onChange={handleChange('destination')} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none transition focus:border-slate-300 focus:bg-white">
                  {destinationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Section 3</span>
              <h2 className="text-lg font-semibold text-slate-900">Chartering Period</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm text-slate-600">
                <span className="mb-2 block font-medium text-slate-700">Required Start Date</span>
                <input type="date" value={form.startDate} onChange={handleChange('startDate')} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none transition focus:border-slate-300 focus:bg-white" />
              </label>

              <label className="block text-sm text-slate-600">
                <span className="mb-2 block font-medium text-slate-700">Required End Date</span>
                <input type="date" value={form.endDate} onChange={handleChange('endDate')} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none transition focus:border-slate-300 focus:bg-white" />
              </label>
            </div>

            <div className="mt-5">
              <label className="block text-sm text-slate-600">
                <span className="mb-2 block font-medium text-slate-700">Contract Preference</span>
                <select value={form.contractPreference} onChange={handleChange('contractPreference')} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none transition focus:border-slate-300 focus:bg-white">
                  {contractOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => navigate('/')} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">
              Analyze Requirement
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
