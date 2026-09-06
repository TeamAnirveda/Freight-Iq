export type Metric = {
  label: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
}

export type FreightPoint = {
  label: string
  value: number
  forecast?: boolean
}

export type CargoRequirement = {
  cargo: string
  quantity: string
  route: string
  vessel: string
  period: string
  status: 'Analyzed' | 'Pending'
}

export type ShipmentPreference = 'Single Shipment' | 'Multiple Shipments' | 'No Preference'
export type ContractPreference = 'Spot Voyage' | 'Short-Term' | 'Mid-Term' | 'No Preference'

export type RequirementState = {
  cargoType: string
  quantity: string
  shipmentPreference: ShipmentPreference
  numberOfShipments: string
  origin: string
  destination: string
  startDate: string
  endDate: string
  contractPreference: ContractPreference
}

export type VesselType = {
  name: string
  capacity: string
  typicalUse: string
  portFlexibility: string
}

export type PortRef = {
  name: string
  maxDraft: string
  maxLOA: string
  maxBeam: string
  cargoHandling: string
}

export const cargoOptions = ['Coal', 'Iron Ore', 'Other Bulk Cargo']
export const originOptions = ['Australia', 'Indonesia', 'Mozambique', 'United States', 'Russia']
export const destinationOptions = ['Paradip', 'Visakhapatnam', 'Gangavaram', 'Gopalpur', 'Dhamra', 'Sagar-Sandheads', 'Haldia']
export const shipmentOptions: ShipmentPreference[] = ['Single Shipment', 'Multiple Shipments', 'No Preference']
export const contractOptions: ContractPreference[] = ['Spot Voyage', 'Short-Term', 'Mid-Term', 'No Preference']

export const sidebarMain = [
  { label: 'Overview', path: '/', icon: 'layout-grid' },
  { label: 'New Requirement', path: '/requirement', icon: 'plus-circle' },
  { label: 'Forecast', path: '/forecast', icon: 'trending-up' },
  { label: 'Vessels', path: '/vessels', icon: 'ship-wheel' },
  { label: 'Ports', path: '/ports', icon: 'anchor' },
]

export const sidebarDecision = [{ label: 'Recommendations', path: '/recommendation', icon: 'lightbulb' }]

export const marketMetrics: Metric[] = [
  { label: 'Current Market', value: '$18.40 / MT', change: 'Market range', trend: 'neutral' },
  { label: '7-Day Forecast', value: '$17.85 / MT', change: '-3.0%', trend: 'down' },
  { label: 'Market Direction', value: '↓ 3.0%', change: 'Softening', trend: 'down' },
  { label: 'Active Requirements', value: '4', change: 'Live mock set', trend: 'neutral' },
]

export const freightHistory: FreightPoint[] = [
  { label: 'D-30', value: 21.2 },
  { label: 'D-25', value: 20.8 },
  { label: 'D-20', value: 20.1 },
  { label: 'D-15', value: 19.5 },
  { label: 'D-10', value: 19.1 },
  { label: 'D-5', value: 18.9 },
  { label: 'Today', value: 18.4 },
  { label: 'F+5', value: 18.2, forecast: true },
  { label: 'F+10', value: 18.0, forecast: true },
  { label: 'F+15', value: 17.8, forecast: true },
  { label: 'F+20', value: 17.7, forecast: true },
  { label: 'F+25', value: 17.6, forecast: true },
  { label: 'F+30', value: 17.5, forecast: true },
]

export const cargoRequirements: CargoRequirement[] = [
  {
    cargo: 'Australian Coal',
    quantity: '100,000 MT',
    route: 'Australia → Paradip',
    vessel: 'Supramax',
    period: 'October 2026',
    status: 'Analyzed',
  },
  {
    cargo: 'Indonesian Coal',
    quantity: '75,000 MT',
    route: 'Indonesia → Vizag',
    vessel: 'Panamax',
    period: 'November 2026',
    status: 'Pending',
  },
  {
    cargo: 'Mozambique Iron Ore',
    quantity: '90,000 MT',
    route: 'Mozambique → Dhamra',
    vessel: 'Supramax',
    period: 'October 2026',
    status: 'Analyzed',
  },
  {
    cargo: 'US Iron Ore',
    quantity: '120,000 MT',
    route: 'United States → Haldia',
    vessel: 'Panamax',
    period: 'December 2026',
    status: 'Pending',
  },
]

export const vesselTypes: VesselType[] = [
  { name: 'Handysize', capacity: '10k–40k DWT', typicalUse: 'Regional cargoes and smaller tonnage flows', portFlexibility: 'High flexibility across smaller berth profiles' },
  { name: 'Supramax', capacity: '50k–60k DWT', typicalUse: 'Medium bulk cargoes and balanced route economics', portFlexibility: 'Strong fit for Indian east coast discharge ports' },
  { name: 'Panamax', capacity: '60k–85k DWT', typicalUse: 'Larger bulk cargo requirements and longer hauls', portFlexibility: 'Moderate fit; some east coast constraints' },
  { name: 'Capesize', capacity: '100k+ DWT', typicalUse: 'Very large bulk shipments and long-haul tonnage', portFlexibility: 'Low suitability for many east coast terminals' },
]

export const portReferences: PortRef[] = [
  { name: 'Paradip', maxDraft: '17.5 m', maxLOA: '230 m', maxBeam: '32 m', cargoHandling: 'High' },
  { name: 'Visakhapatnam', maxDraft: '17.0 m', maxLOA: '225 m', maxBeam: '32 m', cargoHandling: 'High' },
  { name: 'Gangavaram', maxDraft: '16.5 m', maxLOA: '220 m', maxBeam: '31 m', cargoHandling: 'High' },
  { name: 'Gopalpur', maxDraft: '15.0 m', maxLOA: '190 m', maxBeam: '29 m', cargoHandling: 'Moderate' },
  { name: 'Dhamra', maxDraft: '16.0 m', maxLOA: '205 m', maxBeam: '30 m', cargoHandling: 'High' },
  { name: 'Sagar-Sandheads', maxDraft: '14.5 m', maxLOA: '185 m', maxBeam: '28 m', cargoHandling: 'Moderate' },
  { name: 'Haldia', maxDraft: '15.2 m', maxLOA: '200 m', maxBeam: '30 m', cargoHandling: 'High' },
]

export const requirementStorageKey = 'freightiq_requirement_v1'

export const defaultRequirement: RequirementState = {
  cargoType: 'Coal',
  quantity: '80000',
  shipmentPreference: 'Single Shipment',
  numberOfShipments: '2',
  origin: 'Indonesia',
  destination: 'Visakhapatnam',
  startDate: '2026-11-01',
  endDate: '2026-11-15',
  contractPreference: 'Short-Term',
}

export function normalizeRequirement(value: Partial<RequirementState> = {}): RequirementState {
  return {
    cargoType: value.cargoType || defaultRequirement.cargoType,
    quantity: value.quantity || defaultRequirement.quantity,
    shipmentPreference: value.shipmentPreference || defaultRequirement.shipmentPreference,
    numberOfShipments: value.numberOfShipments || defaultRequirement.numberOfShipments,
    origin: value.origin || defaultRequirement.origin,
    destination: value.destination || defaultRequirement.destination,
    startDate: value.startDate || defaultRequirement.startDate,
    endDate: value.endDate || defaultRequirement.endDate,
    contractPreference: value.contractPreference || defaultRequirement.contractPreference,
  }
}

export function getSavedRequirement(): RequirementState | null {
  if (typeof window === 'undefined') {
    return null
  }

  const rawValue = window.localStorage.getItem(requirementStorageKey)
  if (!rawValue) {
    return null
  }

  try {
    return normalizeRequirement(JSON.parse(rawValue) as Partial<RequirementState>)
  } catch {
    return null
  }
}

export function saveRequirement(value: Partial<RequirementState>): RequirementState {
  const normalized = normalizeRequirement(value)

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(requirementStorageKey, JSON.stringify(normalized))
  }

  return normalized
}

export function clearRequirement() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(requirementStorageKey)
  }
}

export function getRecommendedVessel(quantityValue: string | number) {
  const quantity = Number(quantityValue) || 0

  if (quantity <= 40000) {
    return {
      type: 'Handysize',
      capacity: '30,000 DWT',
      cargoFit: 'Moderate',
      portFit: 'Excellent',
      overall: 'Possible',
    }
  }

  if (quantity <= 60000) {
    return {
      type: 'Supramax',
      capacity: '55,000 DWT',
      cargoFit: 'Moderate',
      portFit: 'Excellent',
      overall: 'Recommended',
    }
  }

  if (quantity <= 100000) {
    return {
      type: 'Panamax',
      capacity: '75,000 DWT',
      cargoFit: 'Excellent',
      portFit: 'Good',
      overall: 'Recommended',
    }
  }

  return {
    type: 'Capesize',
    capacity: '150,000 DWT',
    cargoFit: 'Oversized',
    portFit: 'Poor',
    overall: 'Not Suitable',
  }
}

export function getRouteForecast(requirement: RequirementState) {
  const quantity = Number(requirement.quantity) || 0
  const routeBase = requirement.origin === 'Australia' ? 19.2 : requirement.origin === 'Indonesia' ? 18.6 : requirement.origin === 'Mozambique' ? 21.1 : requirement.origin === 'United States' ? 22.8 : 20.4
  const baseCurrent = routeBase + (requirement.destination === 'Visakhapatnam' ? 0.2 : requirement.destination === 'Paradip' ? 0.1 : 0.5)
  const current = quantity > 100000 ? baseCurrent + 0.8 : baseCurrent
  const forecast = current - (requirement.contractPreference === 'Short-Term' ? 0.9 : requirement.contractPreference === 'Spot Voyage' ? 0.5 : 1.1)

  return {
    current: `$${current.toFixed(2)} / MT`,
    expected: `$${forecast.toFixed(2)} / MT`,
    change: `${((forecast - current) / current * 100).toFixed(1)}%`,
    recommendation:
      requirement.contractPreference === 'Spot Voyage'
        ? 'Watch the next spot fixing window and wait for a favorable prompt fix.'
        : requirement.contractPreference === 'Short-Term'
          ? 'Target a short-term multiple-voyage fix during the selected loading window.'
          : requirement.contractPreference === 'Mid-Term'
            ? 'Consider a mid-term arrangement to smooth market exposure across the voyage cycle.'
            : 'Market conditions support waiting for a softer fixing window before committing.',
  }
}

export const recommendationResult = {
  requirement: {
    cargo: 'Coal',
    quantity: '100,000 MT',
    route: 'Australia → Paradip',
    startDate: 'October 2026',
  },
  steps: ['Freight Forecast', 'Vessel Optimization', 'Port Feasibility', 'Chartering Strategy'],
  forecast: {
    current: '$18.40 / MT',
    expected: '$17.85 / MT',
    change: '-3.0%',
    recommendation: 'Wait for a softer market and target fixing during the second half of October.',
  },
  vessel: {
    type: 'SUPRAMAX',
    capacity: '55,000 DWT',
    fit: 'Supramax provides the best balance between cargo capacity and destination port constraints for this requirement.',
    table: [
      { type: 'Handysize', capacity: '30,000 DWT', portFit: 'Good', recommendation: 'Possible' },
      { type: 'Supramax', capacity: '55,000 DWT', portFit: 'Excellent', recommendation: 'Recommended' },
      { type: 'Panamax', capacity: '75,000 DWT', portFit: 'Restricted', recommendation: 'Not preferred' },
      { type: 'Capesize', capacity: '150,000 DWT', portFit: 'Not suitable', recommendation: 'Not suitable' },
    ],
  },
  port: {
    loading: 'Australia',
    discharge: 'Paradip',
    constraints: [
      { label: 'Draft', status: 'Within Limit' },
      { label: 'LOA', status: 'Within Limit' },
      { label: 'Beam', status: 'Within Limit' },
      { label: 'Cargo Handling', status: 'Suitable' },
    ],
  },
  strategy: {
    options: [
      { label: 'SPOT', description: 'Current market fixing' },
      { label: 'SHORT-TERM', description: 'Multiple voyages over a shorter period' },
      { label: 'MID-TERM', description: 'Multiple voyages over a longer period' },
    ],
    recommended: 'Short-Term',
    summary: 'Market conditions indicate a potential advantage in securing a short-term multiple-voyage arrangement rather than repeatedly fixing individual spot voyages.',
    expectedRange: '$17.50–$18.10 / MT',
    fixingWindow: 'October 15–25, 2026',
  },
  finalDecision: {
    title: 'WAIT FOR MARKET ENTRY',
    vessel: 'Supramax',
    route: 'Australia → Paradip',
    strategy: 'Short-Term Multiple Voyage',
    expected: '$17.85 / MT',
    window: 'October 15–25, 2026',
  },
}

export const forecastPageData = {
  route: 'Australia → Paradip',
  vessel: 'Supramax',
  timeRange: '30 Days',
  currentMarket: '$18.40 / MT',
  forecast: '$17.85 / MT',
  expectedChange: '-3.0%',
  outlook: 'Softening',
  explanation: 'Forecast indicates a potential decline in freight rates over the selected period.',
}
