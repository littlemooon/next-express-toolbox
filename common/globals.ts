import { DeviceType } from './types'

export enum WindowKey {
  X = 'X',
  NAVIGATOR = 'navigator',
  LOCAL_STORAGE = 'localStorage',
  DEVICE_TYPE = 'DEVICE_TYPE',
}

declare const window: any

export function fromWindow(key: WindowKey) {
  try {
    return window && window[key]
  } catch (e) {
    // console.warn('Trying to fromWindow:', e);
  }
  return null
}

export function setWindow(key: WindowKey, value: any) {
  try {
    if (window) {
      window[key] = value
    }
  } catch (e) {
    // console.warn('Trying to setWindow:', e);
  }
}

export function getDeviceType(initialUserAgent?: string): DeviceType {
  const globalDeviceType: DeviceType = fromWindow(WindowKey.DEVICE_TYPE)

  if (DeviceType.hasOwnProperty(globalDeviceType)) {
    return globalDeviceType
  } else {
    const navigator = fromWindow(WindowKey.NAVIGATOR)
    const userAgent: string =
      initialUserAgent || (navigator && navigator.userAgent) || ''

    const deviceType = userAgent.match(/iPhone|iPad|iPod/)
      ? DeviceType.ios
      : userAgent.match(/Android/)
      ? DeviceType.android
      : DeviceType.web

    setWindow(WindowKey.DEVICE_TYPE, deviceType)

    return deviceType
  }
}
