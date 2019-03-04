import { DeviceType } from 'common/types'

export enum WindowKey {
  X = 'X',
  NAVIGATOR = 'navigator',
  LOCAL_STORAGE = 'localStorage',
  DEVICE_TYPE = 'DEVICE_TYPE',
}

declare const window: any

export const isServer = typeof window === 'undefined'

export function fromWindow(key: WindowKey) {
  return isServer ? undefined : window[key]
}

export function setWindow(key: WindowKey, value: any) {
  if (!isServer) {
    window[key] = value
  }
  return isServer ? undefined : value
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
