import {
  getStorage,
  removeStorage,
  setStorage,
  StorageIsValid,
  StorageKey,
  StorageValue,
} from 'common/storage'

interface IStorage<T> {
  value: Partial<T> | undefined
  set: (v: T) => void
  remove: () => void
}

export default function useStorage<T extends StorageValue>(
  key: StorageKey,
  isValid: StorageIsValid<T>
): IStorage<T> {
  const set = (value: T) => setStorage(key, value)
  const remove = () => removeStorage(key)

  return {
    value: getStorage<T>(key, isValid),
    set,
    remove,
  }
}
