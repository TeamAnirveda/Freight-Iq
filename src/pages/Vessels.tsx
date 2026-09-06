import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { getRecommendedVessel, getSavedRequirement } from '../data/mockData'

export function Vessels() {
  const requirement = getSavedRequirement()

  if (!requirement) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">No active cargo requirement</h2>
        <p className="mt-3 text-slate-600">Create a requirement to compare vessel types against your cargo profile.</p>
        <Link to="/requirement" className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
          Create Requirement
        </Link>
      </div>
    )
  }

  const recommended = getRecommendedVessel(requirement.quantity)
  const comparison = [
    { name: 'Handysize', capacity: '30k DWT', typicalUse: 'Regional or smaller cargo lots', portFlexibility: 'Excellent' },
    { name: 'Supramax', capacity: '55k DWT', typicalUse: 'Balanced medium cargo flows', portFlexibility: 'Excellent' },
    { name: 'Panamax', capacity: '75k DWT', typicalUse: 'Larger bulk shipments and longer hauls', portFlexibility: 'Good' },
    { name: 'Capesize', capacity: '150k DWT', typicalUse: 'Very large bulk cargoes', portFlexibility: 'Poor' },
  ]

  return (
    <div>
      <Header
        title="Vessel Analysis"
        subtitle={`${requirement.cargoType} · ${requirement.quantity} MT · ${requirement.origin} → ${requirement.destination}`}
      />

      <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Current Requirement</p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-700">
          <span className="font-semibold text-slate-900">{requirement.cargoType}</span>
          <span>{requirement.quantity} MT</span>
          <span>{requirement.origin} → {requirement.destination}</span>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Recommended Vessel</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">{recommended.type}</h3>
            <p className="mt-1 text-sm text-slate-600">Cargo fit: {recommended.cargoFit} · Port fit: {recommended.portFit}</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700 ring-1 ring-emerald-100">
            {recommended.overall}
          </span>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
        {comparison.map((vessel) => {
          const isRecommended = vessel.name === recommended.type
          return (
            <div key={vessel.name} className={`rounded-2xl border p-5 shadow-sm ${isRecommended ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-800'}`}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className={`text-xl font-semibold ${isRecommended ? 'text-white' : 'text-slate-900'}`}>{vessel.name}</h3>
                {isRecommended ? <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-100">Recommended</span> : null}
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${isRecommended ? 'text-slate-300' : 'text-slate-400'}`}>Capacity</p>
                  <p className={`mt-1 font-medium ${isRecommended ? 'text-white' : 'text-slate-800'}`}>{vessel.capacity}</p>
                </div>
                <div>
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${isRecommended ? 'text-slate-300' : 'text-slate-400'}`}>Cargo fit</p>
                  <p className={`${isRecommended ? 'text-slate-200' : 'text-slate-700'}`}>{vessel.name === 'Panamax' ? 'Excellent' : vessel.name === 'Capesize' ? 'Oversized' : 'Moderate'}</p>
                </div>
                <div>
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${isRecommended ? 'text-slate-300' : 'text-slate-400'}`}>Port fit</p>
                  <p className={`${isRecommended ? 'text-slate-200' : 'text-slate-700'}`}>{vessel.portFlexibility}</p>
                </div>
                <div>
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${isRecommended ? 'text-slate-300' : 'text-slate-400'}`}>Overall</p>
                  <p className={`${isRecommended ? 'text-white' : 'text-slate-700'}`}>{isRecommended ? 'Recommended' : vessel.name === 'Capesize' ? 'Not Suitable' : 'Possible'}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
