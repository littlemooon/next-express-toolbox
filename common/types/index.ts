export enum FetchState {
  LOADING = 'LOADING',
  INITIAL = 'INITIAL',
  SUCCESS = 'SUCCESS',
  API_ERROR = 'API_ERROR',
  CATCH_ERROR = 'CATCH_ERROR',
  UNUSED_CALL = 'UNUSED_CALL',
}

export enum DeviceType {
  web = 'web',
  ios = 'ios',
  android = 'android',
}

export interface IFetch<R> {
  data?: R
  state: FetchState
  error?: Error
  abort: () => void
  fetch: () => void
}

export interface IState<R> {
  data: Map<string, R>
  set: (key: string, value: R) => void
  get: (key: string) => R | undefined
}

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
  _raw: '{\n "kind": "plus#person",\n "etag": "\\"jb1Xzanox6i8Zyse4DcYD8sZqy0/XiqOdqAvLPRMg4ABLF6yKkkfPvQ\\"",\n "gender": "male",\n "objectType": "person",\n "id": "110317121122295612260",\n "displayName": "Fred Wright",\n "name": {\n  "familyName": "Wright",\n  "givenName": "Fred"\n },\n "url": "https://plus.google.com/110317121122295612260",\n "image": {\n  "url": "https://lh4.googleusercontent.com/-aSwQDYgoKnI/AAAAAAAAAAI/AAAAAAAAAAA/ACevoQNULmyPoqhyY9N5ibhY5tBQzdUGgA/mo/photo.jpg?sz=50",\n  "isDefault": true\n },\n "isPlusUser": true,\n "language": "en_GB",\n "circledByCount": 0,\n "verified": false\n}\n'
  _json: {
    kind: 'plus#person'
    etag: '"jb1Xzanox6i8Zyse4DcYD8sZqy0/XiqOdqAvLPRMg4ABLF6yKkkfPvQ"'
    gender: 'male'
    objectType: 'person'
    id: '110317121122295612260'
    displayName: 'Fred Wright'
    name: {
      familyName: 'Wright'
      givenName: 'Fred'
    }
    url: 'https://plus.google.com/110317121122295612260'
    image: {
      url: 'https://lh4.googleusercontent.com/-aSwQDYgoKnI/AAAAAAAAAAI/AAAAAAAAAAA/ACevoQNULmyPoqhyY9N5ibhY5tBQzdUGgA/mo/photo.jpg?sz=50'
      isDefault: true
    }
    isPlusUser: true
    language: 'en_GB'
    circledByCount: 0
    verified: false
  }
}
