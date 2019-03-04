import { fromWindow, WindowKey } from './globals'

let localStorage: Storage | undefined

try {
  localStorage = fromWindow(WindowKey.LOCAL_STORAGE)
} catch (e) {
  // console.warn('Cannot access localstorage');
}

export enum StorageKey {
  X = 'X',
  AUTH_STATE = 'AUTH_STATE',
}

export type StorageIsValid<T> = (v: any) => v is T

export type StorageValue = string | object | boolean | null

function parse(value: string | null) {
  let parsed
  try {
    parsed = value ? JSON.parse(value) : value
  } catch (e) {
    parsed = value
  }

  return parsed === 'null' ? undefined : parsed
}

export function getStorage<T extends StorageValue>(
  key: StorageKey,
  isValid: StorageIsValid<T>
): T | undefined {
  const value = localStorage && parse(localStorage.getItem(key))
  return isValid(value) ? value : undefined
}

export function setStorage<T extends StorageValue>(key: StorageKey, value?: T) {
  if (typeof value === 'undefined' || value === null || value === '') {
    return removeStorage(key)
  } else if (localStorage) {
    return localStorage.setItem(key, JSON.stringify(value))
  }
}

export function removeStorage(key: StorageKey) {
  return localStorage && localStorage.removeItem(key)
}
