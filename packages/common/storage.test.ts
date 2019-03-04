import {
  getStorage,
  removeStorage,
  setStorage,
  StorageKey,
} from 'common/storage'

type I = object

function isValid(_: any): _ is I {
  return true
}

function isInvalid(_: any): _ is I {
  return false
}

describe('local storage', () => {
  beforeEach(() => window.localStorage.clear())

  it('Handles non existent item', () => {
    expect(getStorage<I>(StorageKey.X, isValid)).toEqual(null)
  })
  it('Handles setting and getting undefined', () => {
    setStorage(StorageKey.X, undefined)
    expect(getStorage<I>(StorageKey.X, isValid)).toEqual(null)
  })
  it('Handles setting and getting null', () => {
    setStorage(StorageKey.X, null)
    expect(getStorage<I>(StorageKey.X, isValid)).toEqual(null)
  })
  it('Handles setting and getting null string', () => {
    setStorage(StorageKey.X, 'null')
    expect(getStorage<I>(StorageKey.X, isValid)).toEqual(undefined)
  })
  it('Handles setting and getting string', () => {
    const value = 'string'
    setStorage(StorageKey.X, value)
    expect(getStorage<I>(StorageKey.X, isValid)).toEqual(value)
  })
  it('Handles setting and getting true', () => {
    const value = true
    setStorage(StorageKey.X, value)
    expect(getStorage<I>(StorageKey.X, isValid)).toEqual(value)
  })
  it('Handles setting and getting false', () => {
    const value = false
    setStorage(StorageKey.X, value)
    expect(getStorage<I>(StorageKey.X, isValid)).toEqual(value)
  })
  it('Handles setting and getting object', () => {
    const value = { key: 'value' }
    setStorage(StorageKey.X, value)
    expect(getStorage<I>(StorageKey.X, isValid)).toEqual(value)
  })
  it('Handles setting and getting array', () => {
    const value = [1, '2', true]
    setStorage(StorageKey.X, value)
    expect(getStorage<I>(StorageKey.X, isValid)).toEqual(value)
  })
  it('Handles removal', () => {
    const value = 'string'
    setStorage(StorageKey.X, value)
    expect(getStorage<I>(StorageKey.X, isValid)).toEqual(value)
    removeStorage(StorageKey.X)
    expect(getStorage<I>(StorageKey.X, isValid)).toEqual(null)
  })
  it('Handles removal if undefined passed to setter', () => {
    const value = 'string'
    setStorage(StorageKey.X, value)
    expect(getStorage<I>(StorageKey.X, isValid)).toEqual(value)
    setStorage(StorageKey.X, undefined)
    expect(getStorage<I>(StorageKey.X, isValid)).toEqual(null)
  })
  it('Handles removal if null passed to setter', () => {
    const value = 'string'
    setStorage(StorageKey.X, value)
    expect(getStorage<I>(StorageKey.X, isValid)).toEqual(value)
    setStorage(StorageKey.X, null)
    expect(getStorage<I>(StorageKey.X, isValid)).toEqual(null)
  })
  it('Handles removal if empty string passed to setter', () => {
    const value = 'string'
    setStorage(StorageKey.X, value)
    expect(getStorage<I>(StorageKey.X, isValid)).toEqual(value)
    setStorage(StorageKey.X, '')
    expect(getStorage<I>(StorageKey.X, isValid)).toEqual(null)
  })
  it('Handles in valid type', () => {
    const value = 'string'
    setStorage(StorageKey.X, value)
    expect(getStorage<I>(StorageKey.X, isInvalid)).toEqual(undefined)
  })
})
