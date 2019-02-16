export enum DeviceType {
  web = 'web',
  ios = 'ios',
  android = 'android',
}

export type TFileList = string[]

export interface ICsvFile<T> {
  headers: string[]
  rows: T[]
}

export type TJsonFile<T> = T

export type TFile<T = any> = ICsvFile<T> | TJsonFile<T>

export interface IAuthUser {
  id: string
  displayName: string
  name: {
    familyName: string
    givenName: string
  }
  photos: Array<{
    value: string
  }>
  provider: 'google'
  gender: string
  _raw: string
  _json: {
    kind: string
    etag: string
    gender: string
    objectType: string
    id: string
    displayName: string
    name: {
      familyName: string
      givenName: string
    }
    url: string
    image: {
      url: string
      isDefault: boolean
    }
    isPlusUser: boolean
    language: string
    circledByCount: number
    verified: boolean
  }
}
