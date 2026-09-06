import { type ChangeEvent, useState } from 'react'
import { ArrowRight, Compass, ShipWheel } from 'lucide-react'
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

  const shipmentDescriptions: Record<string, string> = {
    'Single Shipment': 'One voyage to deliver the complete tonnage requirement.',
    'Multiple Shipments': 'Split the cargo into several voyage allocations.',
    'No Preference': 'Let FreightIQ choose the most efficient structure.',
  }

  return (
    <div className="space-y-6">
      <Header
        title="Create Cargo Requirement"
        subtitle="Submit the cargo profile to generate the freight forecast, vessel analysis, port feasibility and chartering recommendation."
      />

      <div className="relative overflow-hidden rounded-[28px] border border-sky-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(240,249,255,0.9))] p-4 shadow-[0_28px_80px_-48px_rgba(15,23,42,0.5)] md:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,199,214,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_32%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-[-18px] h-24 opacity-90">
          <svg viewBox="0 0 1200 120" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,68 C120,48 210,92 340,78 S570,28 720,64 S1010,102 1200,58 L1200,120 L0,120 Z" fill="rgba(34,197,220,0.12)" />
            <path d="M0,84 C176,58 298,100 432,82 S716,48 860,80 S1038,102 1200,74" fill="none" stroke="rgba(14,165,233,0.2)" strokeWidth="2" />
          </svg>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          <section className="form-section-card maritime-card p-5 md:p-6" style={{ animationDelay: '40ms' }}>
            <div className="mb-5 flex items-center gap-3">
              <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-700">FREIGHTIQ • CHARTERING INPUT</span>
            </div>

            <div className="mb-5 flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Section 1</span>
              <h2 className="text-lg font-semibold text-slate-900">Cargo & Route</h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.1fr,1.3fr,1.1fr]">
              <label className="block text-sm text-slate-600">
                <span className="mb-2 block font-medium text-slate-700">Cargo Quantity</span>
                <div className="field-shell flex items-center gap-3 rounded-2xl px-3 py-2.5">
                  <input value={form.quantity} onChange={handleChange('quantity')} className="field-input w-full bg-transparent text-slate-800 placeholder:text-slate-400" placeholder="80,000" />
                  <span className="text-sm font-medium text-slate-500">MT</span>
                </div>
              </label>

              <label className="block text-sm text-slate-600">
                <span className="mb-2 block font-medium text-slate-700">Origin</span>
                <div className="field-shell rounded-2xl px-3 py-2.5">
                  <select value={form.origin} onChange={handleChange('origin')} className="field-select w-full bg-transparent text-slate-800">
                    {originOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </label>

              <label className="block text-sm text-slate-600">
                <span className="mb-2 block font-medium text-slate-700">Destination</span>
                <div className="field-shell rounded-2xl px-3 py-2.5">
                  <select value={form.destination} onChange={handleChange('destination')} className="field-select w-full bg-transparent text-slate-800">
                    {destinationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            </div>
          </section>

          <section className="form-section-card maritime-card p-5 md:p-6" style={{ animationDelay: '110ms' }}>
            <div className="mb-5 flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Section 2</span>
              <h2 className="text-lg font-semibold text-slate-900">Shipment Preference</h2>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {shipmentOptions.map((option) => {
                const selected = form.shipmentPreference === option

                return (
                  <button
                    key={option}
                    type="button"
                    className={`shipment-option rounded-2xl p-4 text-left ${selected ? 'shipment-option--selected' : ''}`}
                    onClick={() => setForm((current) => ({ ...current, shipmentPreference: option }))}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-base font-semibold text-slate-900">{option}</span>
                      {selected ? <span className="rounded-full bg-cyan-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-700">Selected</span> : null}
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{shipmentDescriptions[option]}</p>
                  </button>
                )
              })}
            </div>

            <div className={`overflow-hidden transition-all duration-300 ${form.shipmentPreference === 'Multiple Shipments' ? 'mt-5 max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <label className="block text-sm text-slate-600">
                <span className="mb-2 block font-medium text-slate-700">Number of Shipments</span>
                <div className="field-shell rounded-2xl px-3 py-2.5">
                  <input value={form.numberOfShipments} onChange={handleChange('numberOfShipments')} className="field-input w-full bg-transparent text-slate-800" />
                </div>
              </label>
            </div>
          </section>

          <section className="form-section-card maritime-card p-5 md:p-6" style={{ animationDelay: '180ms' }}>
            <div className="mb-5 flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Section 3</span>
              <h2 className="text-lg font-semibold text-slate-900">Delivery Window</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm text-slate-600">
                <span className="mb-2 block font-medium text-slate-700">Required Start Date</span>
                <div className="field-shell rounded-2xl px-3 py-2.5">
                  <input type="date" value={form.startDate} onChange={handleChange('startDate')} className="field-input w-full bg-transparent text-slate-800" />
                </div>
              </label>

              <label className="block text-sm text-slate-600">
                <span className="mb-2 block font-medium text-slate-700">Required End Date</span>
                <div className="field-shell rounded-2xl px-3 py-2.5">
                  <input type="date" value={form.endDate} onChange={handleChange('endDate')} className="field-input w-full bg-transparent text-slate-800" />
                </div>
              </label>
            </div>

            <div className="mt-5">
              <label className="block text-sm text-slate-600">
                <span className="mb-2 block font-medium text-slate-700">Contract Preference</span>
                <div className="field-shell rounded-2xl px-3 py-2.5">
                  <select value={form.contractPreference} onChange={handleChange('contractPreference')} className="field-select w-full bg-transparent text-slate-800">
                    {contractOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            </div>
          </section>

          <section className="form-section-card maritime-card p-5 md:p-6" style={{ animationDelay: '250ms' }}>
            <div className="mb-5 flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Review</span>
              <h2 className="text-lg font-semibold text-slate-900">Requirement Summary</h2>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  <Compass size={12} />
                  Route
                </div>
                <p className="mt-3 text-base font-semibold text-slate-900">{form.origin} → {form.destination}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  <ShipWheel size={12} />
                  Cargo
                </div>
                <p className="mt-3 text-base font-semibold text-slate-900">{form.quantity} MT</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  <ArrowRight size={12} />
                  Strategy
                </div>
                <p className="mt-3 text-base font-semibold text-slate-900">{form.shipmentPreference}</p>
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => navigate('/')} className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" className="rounded-2xl bg-[linear-gradient(180deg,#0f172a_0%,#0b1f3b_100%)] px-4 py-2.5 text-sm font-medium text-white shadow-[0_20px_30px_-20px_rgba(15,23,42,0.8)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_34px_-18px_rgba(14,116,144,0.8)]">
              Generate Freight Strategy
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
