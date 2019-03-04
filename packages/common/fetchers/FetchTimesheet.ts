import Fetch from 'common/Fetch'
import {
  ITimesheetData,
  ITimesheetDataRaw,
  ITimesheetDataSerialized,
} from 'common/types/api'
import * as df from 'date-fns'
import * as R from 'ramda'

export default class FetchTimesheet extends Fetch<
  ITimesheetData[],
  { filename: string }
> {
  constructor(opts?: RequestInit) {
    super(({ filename }) => `/drive/timesheet/${filename}`, opts)
  }

  public transformBody = async (res: Response): Promise<ITimesheetData[]> => {
    const json = (await res.json()) as ITimesheetDataRaw[]
    return R.sortBy(
      R.prop('startDate'),
      json.map(x => {
        const seconds = parseInt(x.duration_seconds, 10)
        const minutes = seconds ? seconds / 60 : 0
        const hours = minutes ? minutes / 60 : 0

        return {
          activity: x.activity,
          project: x.project,
          startDate: df.startOfDay(x.start_time),
          endDate: df.startOfDay(x.end_time),
          durationSeconds: seconds,
          durationMinutes: minutes,
          durationHours: hours,
        }
      })
    )
  }

  public deserialize(data: ITimesheetDataSerialized[]): ITimesheetData[] {
    return data.map(obj => ({
      ...obj,
      startDate: df.parse(obj.startDate),
      endDate: df.parse(obj.endDate),
    }))
  }
}
