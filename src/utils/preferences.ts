import { useSyncExternalStore } from 'react'

export type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP' | 'CNY' | 'JPY' | 'SGD' | 'AED'
export type UnitSystem = 'Metric' | 'Imperial'

export type AppPreferences = {
  currency: CurrencyCode
  units: UnitSystem
}

export const preferencesStorageKey = 'freightiq_preferences_v1'

export const defaultPreferences: AppPreferences = {
  currency: 'USD',
  units: 'Metric',
}

let cachedPreferences: AppPreferences = defaultPreferences

export const currencyRates: Record<CurrencyCode, number> = {
  USD: 1,
  INR: 83.5,
  EUR: 0.92,
  GBP: 0.79,
  CNY: 7.2,
  JPY: 157.5,
  SGD: 1.35,
  AED: 3.67,
}

export const currencySymbols: Record<CurrencyCode, string> = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
  CNY: '¥',
  JPY: '¥',
  SGD: 'S$',
  AED: 'د.إ',
}

export const massUnitLabels: Record<UnitSystem, string> = {
  Metric: 'MT',
  Imperial: 'LT',
}

export function isCurrencyCode(value: unknown): value is CurrencyCode {
  return typeof value === 'string' && value in currencyRates
}

export function isUnitSystem(value: unknown): value is UnitSystem {
  return value === 'Metric' || value === 'Imperial'
}

export function normalizePreferences(value: Partial<AppPreferences> | null | undefined): AppPreferences {
  const nextCurrency = isCurrencyCode(value?.currency) ? value.currency : defaultPreferences.currency
  const nextUnits = isUnitSystem(value?.units) ? value.units : defaultPreferences.units

  return {
    currency: nextCurrency,
    units: nextUnits,
  }
}

export function readPreferences(): AppPreferences {
  if (typeof window === 'undefined') {
    return cachedPreferences
  }

  try {
    const storedValue = window.localStorage.getItem(preferencesStorageKey)
    if (!storedValue) {
      if (cachedPreferences.currency !== defaultPreferences.currency || cachedPreferences.units !== defaultPreferences.units) {
        cachedPreferences = defaultPreferences
      }
      return cachedPreferences
    }

    const parsed = JSON.parse(storedValue)
    if (!parsed || typeof parsed !== 'object') {
      if (cachedPreferences.currency !== defaultPreferences.currency || cachedPreferences.units !== defaultPreferences.units) {
        cachedPreferences = defaultPreferences
      }
      return cachedPreferences
    }

    const normalized = normalizePreferences(parsed as Partial<AppPreferences>)
    if (cachedPreferences.currency !== normalized.currency || cachedPreferences.units !== normalized.units) {
      cachedPreferences = normalized
    }
    return cachedPreferences
  } catch {
    if (cachedPreferences.currency !== defaultPreferences.currency || cachedPreferences.units !== defaultPreferences.units) {
      cachedPreferences = defaultPreferences
    }
    return cachedPreferences
  }
}

export function savePreferences(nextPreferences: Partial<AppPreferences> = defaultPreferences) {
  const normalized = normalizePreferences(nextPreferences)
  if (cachedPreferences.currency !== normalized.currency || cachedPreferences.units !== normalized.units) {
    cachedPreferences = normalized
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(preferencesStorageKey, JSON.stringify(cachedPreferences))
    window.dispatchEvent(new Event('freightiq-preferences-updated'))
  }

  return cachedPreferences
}

function subscribeToPreferences(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined
  }

  const handler = () => callback()
  window.addEventListener('freightiq-preferences-updated', handler)
  window.addEventListener('storage', handler)

  return () => {
    window.removeEventListener('freightiq-preferences-updated', handler)
    window.removeEventListener('storage', handler)
  }
}

export function usePreferences() {
  return useSyncExternalStore(
    subscribeToPreferences,
    readPreferences,
    readPreferences,
  )
}

export function parseNumericValue(value: string | number): number {
  const cleaned = String(value).replace(/[^0-9.-]/g, '')
  const parsed = Number(cleaned)
  return Number.isFinite(parsed) ? parsed : 0
}

export function convertCurrency(value: number, fromCurrency: CurrencyCode = 'USD', toCurrency: CurrencyCode = 'USD') {
  const source = currencyRates[fromCurrency] ?? 1
  const target = currencyRates[toCurrency] ?? 1
  return (value / source) * target
}

export function formatCurrency(value: number, currency: CurrencyCode = 'USD') {
  const safeCurrency = isCurrencyCode(currency) ? currency : 'USD'
  const numericValue = Number.isFinite(value) ? value : 0
  const converted = convertCurrency(numericValue, 'USD', safeCurrency)
  const symbol = currencySymbols[safeCurrency] ?? '$'
  return `${symbol}${converted.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function formatCurrencyRate(value: number, currency: CurrencyCode = 'USD', units: UnitSystem = 'Metric') {
  const safeCurrency = isCurrencyCode(currency) ? currency : 'USD'
  const safeUnits = isUnitSystem(units) ? units : 'Metric'
  const formattedCurrency = formatCurrency(value, safeCurrency)
  const massUnit = massUnitLabels[safeUnits]
  return `${formattedCurrency} / ${massUnit}`
}

export function formatMass(value: number, unitSystem: UnitSystem = 'Metric') {
  const safeUnitSystem = isUnitSystem(unitSystem) ? unitSystem : 'Metric'
  const convertedValue = safeUnitSystem === 'Metric' ? value : value * 1.10231
  const unit = massUnitLabels[safeUnitSystem]
  return `${convertedValue.toLocaleString('en-US', { maximumFractionDigits: 1 })} ${unit}`
}

export function formatLength(value: number, unitSystem: UnitSystem = 'Metric') {
  const safeUnitSystem = isUnitSystem(unitSystem) ? unitSystem : 'Metric'
  const convertedValue = safeUnitSystem === 'Metric' ? value : value * 3.28084
  const unit = safeUnitSystem === 'Metric' ? 'm' : 'ft'
  return `${convertedValue.toLocaleString('en-US', { maximumFractionDigits: 1 })} ${unit}`
}

export function formatPortDimension(value: string | number, unitSystem: UnitSystem = 'Metric') {
  const numericValue = parseNumericValue(value)
  return formatLength(numericValue, unitSystem)
}

export function formatValueFromText(rawValue: string, currency: CurrencyCode, units: UnitSystem) {
  if (!rawValue) {
    return rawValue
  }

  if (/[$€£¥₹د.إ]/.test(rawValue)) {
    const numericValue = parseNumericValue(rawValue)
    return formatCurrencyRate(numericValue, currency, units)
  }

  if (/MT|LT|m\b|ft\b/i.test(rawValue)) {
    const numericValue = parseNumericValue(rawValue)
    return /m\b|ft\b/i.test(rawValue)
      ? formatLength(numericValue, units)
      : formatMass(numericValue, units)
  }

  return rawValue
}
