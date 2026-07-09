import { useState, useEffect } from 'react'

function parseStoredValue(value, fallback) {
  try {
    return value === null ? fallback : JSON.parse(value)
  } catch {
    return fallback
  }
}

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return typeof initialValue === 'function' ? initialValue() : initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return parseStoredValue(item, typeof initialValue === 'function' ? initialValue() : initialValue)
    } catch {
      return typeof initialValue === 'function' ? initialValue() : initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (err) {
      console.warn(`Error guardando en localStorage (${key}):`, err)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
