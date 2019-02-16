import to from 'await-to-js'
import Fetch from '../Fetch'
import { TFile } from '../types/index'

export default class FetchFile<T> extends Fetch<
  TFile<T>,
  { filename: string }
> {
  public transformBody = async (res: Response): Promise<TFile<T>> => {
    const [, json] = await to(res.json())

    return Array.isArray(json)
      ? {
          headers: json ? Object.keys(json[0]) : [],
          rows: json || [],
        }
      : json
  }
}
