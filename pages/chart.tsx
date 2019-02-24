import * as df from 'date-fns'
import { NextFC } from 'next'
import * as R from 'ramda'
import { useMemo } from 'react'
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory'
import { FetchState } from '../common/Fetch'
import { timesheetFetcher } from '../common/fetchers/index'
import useFetch from '../common/hooks/useFetch'
import { ITimesheetData } from '../common/types/api'
import victoryTheme from '../common/victory-theme'
import Card from '../components/base/Card'
import ErrorBox from '../components/base/ErrorBox'
import Spinner from '../components/base/Spinner'
import Layout from '../layout'
import { CacheKey } from '../state/CacheState'

export type TMinMax<T> = { min: T; max: T } | undefined

function getMinMaxBy<T extends object, V>(
  data: T[],
  getValue: (x: T) => V
): TMinMax<T> {
  return data.reduce((acc: TMinMax<T>, x: T) => {
    const value = getValue(x)
    return acc
      ? {
          min: getValue(acc.min) < value ? acc.min : x,
          max: getValue(acc.max) > value ? acc.max : x,
        }
      : {
          min: x,
          max: x,
        }
  }, undefined)
}

function getMagnitude(x: number) {
  // https://stackoverflow.com/questions/23917074/javascript-flooring-number-to-order-of-magnitude
  const order = Math.floor(Math.log(Math.abs(x)) / Math.LN10 + 0.000000001)
  return Math.pow(10, order)
}

function getTickNumbers(x: number): number[] {
  if (!x) {
    return []
  }

  const mag = getMagnitude(x)
  const count = x ? Math.ceil(x / mag) : 0

  return count < 5
    ? getTickNumbers(Math.floor(x / 10))
    : Array.from({ length: count + 1 }, (_, i) => i * mag)
}

function getAxisNumber<T extends object>(
  data: T[],
  getNumber: (x: T) => number
) {
  const minMax = getMinMaxBy<T, number>(data, getNumber)
  if (!minMax) {
    return {}
  }

  return {
    tickValues: getTickNumbers(getNumber(minMax.max)),
  }
}

function getAxisDate<T extends object>(data: T[], getDate: (x: T) => Date) {
  const minMax = getMinMaxBy<T, Date>(data, getDate)
  if (!minMax) {
    return {}
  }

  const diff = df.differenceInDays(getDate(minMax.min), getDate(minMax.max))
  const tickFormat = (d: Date) =>
    df.format(d, diff > 365 ? 'YYYY' : diff > 31 ? 'MM' : 'D MMM')
  const tickValues = R.map(x => getDate(x), data)

  return {
    tickFormat,
    tickValues,
    tickCount: 5,
  }
}

function getFilledDates<T extends object>(
  data: T[],
  getDate: (x: T) => Date,
  getDefault: (d: Date) => T
): T[] {
  const minMax = getMinMaxBy<T, Date>(data, getDate)
  if (!minMax) {
    return []
  }

  const days = df.eachDay(getDate(minMax.min), getDate(minMax.max))

  const filledData = R.map(d => {
    console.log(
      '-------------------- chart --> ',
      R.find(x => df.isSameDay(getDate(x), d), data)
    )
    return R.find(x => df.isSameDay(getDate(x), d), data) || getDefault(d)
  }, days)

  return filledData
}

const ChartPage: NextFC<{ filename: string }> = props => {
  const fetch = useFetch(CacheKey.FILE, timesheetFetcher, {
    initialUrlParams: {
      filename: props.filename,
    },
  })

  const data = fetch.data as ITimesheetData[]

  const filledData = useMemo(() => {
    return getFilledDates<ITimesheetData>(
      data,
      x => df.parse(x.startDate),
      d => ({
        activity: '',
        project: '',
        startDate: d,
        endDate: d,
        durationSeconds: 0,
        durationMinutes: 0,
        durationHours: 0,
      })
    )
  }, [fetch.state])

  const xAxis = useMemo(() => {
    return getAxisDate<ITimesheetData>(filledData, x => df.parse(x.startDate))
  }, [fetch.state])

  const yAxis = useMemo(() => {
    return getAxisNumber<ITimesheetData>(filledData, x => x.durationHours)
  }, [fetch.state])
  console.log(
    '-------------------- chart --> ',
    filledData.map(R.prop('startDate'))
  )
  return (
    <Layout>
      <Card>
        {fetch.state === FetchState.SUCCESS ? (
          <>
            <VictoryChart domainPadding={20} theme={victoryTheme} width={400}>
              <VictoryAxis {...xAxis} />
              <VictoryAxis dependentAxis={true} {...yAxis} />
              <VictoryBar data={filledData} x="startDate" y="durationHours" />
            </VictoryChart>
          </>
        ) : fetch.state === FetchState.ERROR ? (
          <ErrorBox header="Failed to load csv file" error={fetch.error} />
        ) : (
          <Spinner />
        )}
      </Card>
    </Layout>
  )
}

ChartPage.getInitialProps = async ({ query }) => {
  const filename: string =
    query && typeof query.q === 'string'
      ? query.q
      : 'toptracker_2019_01_31_07_16.csv'

  const result = await timesheetFetcher.get({ filename })
  return {
    filename,
    initialCache: new Map([[CacheKey.FILE, result]]),
  }
}

export default ChartPage
