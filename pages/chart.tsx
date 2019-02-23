import * as df from 'date-fns'
import { NextFC } from 'next'
import * as R from 'ramda'
import { useMemo } from 'react'
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory'
import { FetchState } from '../common/Fetch'
import { timesheetFetcher } from '../common/fetchers/index'
import useFetch from '../common/hooks/useFetch'
import { ITimesheetData, Seconds } from '../common/types/api'
import Card from '../components/base/Card'
import ErrorBox from '../components/base/ErrorBox'
import Spinner from '../components/base/Spinner'
import Layout from '../layout'
import { CacheKey } from '../state/CacheState'
import victoryTheme from '../common/victory-theme';
import ClientOnly from '../layout/ClientOnly';

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

function getFilledDays<T extends object>(
  data: T[],
  getDate: (x: T) => Date,
  getDefault: (d: Date) => T
): T[] {
  const minMax = getMinMaxBy<T, Date>(data, getDate)

  if (minMax) {
    const days = df.eachDay(getDate(minMax.min), getDate(minMax.max))

    const filledData = R.map(d => {
      return R.find(x => df.isSameDay(getDate(x), d), data) || getDefault(d)
    }, days)

    return filledData
  } else {
    return []
  }
}

const ChartPage: NextFC<{ filename: string }> = props => {
  const fetch = useFetch(CacheKey.FILE, timesheetFetcher, {
    initialUrlParams: {
      filename: props.filename,
    },
  })

  const data = fetch.data as ITimesheetData[]

  const filledData = useMemo(() => {
    return getFilledDays<ITimesheetData>(
      data,
      x => x.startDate,
      d => ({
        activity: '',
        project: '',
        startDate: d,
        endDate: d,
        duration: 0,
      })
    )
  }, [fetch.state])

  const tickFormatX = (d: Date) => df.format(d, 'DD-MM')
  const tickValuesX = useMemo(() => {
    return R.map(x => R.prop('startDate', x), filledData)
  }, [fetch.state])

  const tickFormatY = (x: Seconds) => `${x / (60 * 60)}h`

  console.log('-------------------- chart --> ', filledData)
  return (
    <Layout>
      <Card>
        {fetch.state === FetchState.SUCCESS ? (
          <>
            <ClientOnly>
              <VictoryChart domainPadding={20} theme={victoryTheme}>
                <VictoryAxis tickFormat={tickFormatX} tickValues={tickValuesX} />
                <VictoryBar data={filledData} x="startDate" y="duration" />
                <VictoryAxis dependentAxis tickFormat={tickFormatY} />
              </VictoryChart>
              {/* <Table data={filledData} /> */}
            </ClientOnly>
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
