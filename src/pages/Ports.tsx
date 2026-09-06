import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { PortCard } from '../components/PortCard'
import { getSavedRequirement, portReferences } from '../data/mockData'
import { formatMass, usePreferences } from '../utils/preferences'

export function Ports() {
  const requirement = getSavedRequirement()
  const preferences = usePreferences()

  if (!requirement) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">No active cargo requirement</h2>
        <p className="mt-3 text-slate-600">Create a requirement to evaluate port feasibility for your route.</p>
        <Link to="/requirement" className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
          Create Requirement
        </Link>
      </div>
    )
  }

  const destinationPort = portReferences.find((port) => port.name === requirement.destination)
  const compatibility = destinationPort
    ? [
        ['Draft', destinationPort.maxDraft],
        ['LOA', destinationPort.maxLOA],
        ['Beam', destinationPort.maxBeam],
        ['Cargo Handling', destinationPort.cargoHandling],
      ]
    : []

  return (
    <div>
      <Header
        title="Port Feasibility"
        subtitle={`${requirement.origin} → ${requirement.destination} · ${requirement.cargoType} · ${formatMass(Number(requirement.quantity), preferences.units)}`}
      />

      <div className="maritime-card mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm" style={{ animationDelay: '20ms' }}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Current Route</p>
        <div className="mt-3 text-xl font-semibold text-slate-900">{requirement.origin} → {requirement.destination}</div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {destinationPort ? (
          <div className="maritime-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2 xl:col-span-3" style={{ animationDelay: '100ms' }}>
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Destination Port</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">{destinationPort.name}</h3>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700 ring-1 ring-emerald-100">
                Suitable
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {compatibility.map(([label, value], index) => (
                <div key={label} style={{ animationDelay: `${150 + index * 60}ms` }} className="maritime-card rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
              <span className="font-medium text-emerald-700">✓ Suitable</span> · The selected vessel profile is compatible with the port constraints for this route.
            </div>
          </div>
        ) : null}

        {portReferences.map((port, index) => (
          <PortCard
            key={port.name}
            name={port.name}
            maxDraft={port.maxDraft}
            maxLOA={port.maxLOA}
            maxBeam={port.maxBeam}
            cargoHandling={port.cargoHandling}
            style={{ animationDelay: `${180 + index * 80}ms` }}
          />
        ))}
      </div>
    </div>
  )
}
