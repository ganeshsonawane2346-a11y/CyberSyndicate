import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPercent(value: number) {
  return `${value.toFixed(1)}%`
}

export function getHealthColor(score: number): 'green' | 'yellow' | 'red' {
  if (score >= 75) return 'green'
  if (score >= 50) return 'yellow'
  return 'red'
}

export const healthColors = {
  green: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/40', text: 'text-emerald-400', dot: '#10b981' },
  yellow: { bg: 'bg-amber-500/20', border: 'border-amber-500/40', text: 'text-amber-400', dot: '#f59e0b' },
  red: { bg: 'bg-red-500/20', border: 'border-red-500/40', text: 'text-red-400', dot: '#ef4444' },
}
