import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getTimestampInSeconds() {
  return Math.floor(Date.now() / 1000)
}

export function validateValue(value, defaultValue) {
  if (value === null || !value) return defaultValue || ''
  return value
}
export function extractTextInParentheses(text) {
  const match = text.match(/\(([^)]+)\)/) // Regular expression to find text inside ()
  return match ? match[1] : null // Return captured group or null if not found
}
