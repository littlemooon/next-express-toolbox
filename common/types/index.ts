export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export enum DeviceType {
  web = 'web',
  ios = 'ios',
  android = 'android',
}

export type TFileList = string[]

export type TCsvFile<T extends object = {}> = T[]

export type TJsonFile<T extends object = {}> = T

export type TFile<T extends object = {}> = TCsvFile<T> | TJsonFile<T>

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
