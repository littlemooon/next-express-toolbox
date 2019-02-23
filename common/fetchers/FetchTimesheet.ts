import * as df from 'date-fns'
import * as R from 'ramda'
import Fetch from '../Fetch'
import { ITimesheetData, ITimesheetDataRaw } from '../types/api'

export default class FetchTimesheet extends Fetch<
  ITimesheetData[],
  { filename: string }
> {
  constructor(opts?: RequestInit) {
    super(({ filename }) => `/file/${filename}`, opts)
  }

  public transformBody = async (res: Response): Promise<ITimesheetData[]> => {
    const json = (await res.json()) as ITimesheetDataRaw[]
    return R.sortBy(
      R.prop('startDate'),
      json.map(x => ({
        activity: x.activity,
        project: x.project,
        startDate: df.parse(x.start_time),
        endDate: df.parse(x.end_time),
        duration: parseInt(x.duration_seconds, 10),
      }))
    )
  }
}
