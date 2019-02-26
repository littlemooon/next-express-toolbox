import * as df from 'date-fns'
import * as R from 'ramda'
import { ReactElement, useMemo } from 'react'
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory'
import victoryTheme from '../../common/victory-theme'

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
    return R.find(x => df.isSameDay(getDate(x), d), data) || getDefault(d)
  }, days)

  return filledData
}

export interface IDateChartProps<T> {
  data?: T[]
  x: keyof T
  y: keyof T
  getX: (obj: T) => Date
  getY: (obj: T) => number
  getDefault: (d: Date) => T
}

function DateChart<T extends object>(
  props: IDateChartProps<T>
): ReactElement<IDateChartProps<T>> {
  const filledData = useMemo(() => {
    return getFilledDates<T>(props.data || [], props.getX, props.getDefault)
  }, [props.data])

  const xAxis = useMemo(() => {
    return getAxisDate<T>(filledData, props.getX)
  }, [filledData])

  const yAxis = useMemo(() => {
    return getAxisNumber<T>(filledData, props.getY)
  }, [filledData])

  return (
    <VictoryChart domainPadding={20} theme={victoryTheme} width={400}>
      <VictoryAxis {...xAxis} />
      <VictoryAxis dependentAxis={true} {...yAxis} />
      <VictoryBar
        data={filledData}
        x={props.x as string}
        y={props.y as string}
      />
    </VictoryChart>
  )
}

export default DateChart
