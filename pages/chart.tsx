import { NextFC } from 'next'
import { timesheetFetcher } from '../common/fetchers/index'
import TimesheetChart from '../components/chart/TimesheetChart'
import Layout from '../layout'
import { CacheKey } from '../state/CacheState'

const files = [
  'toptracker_2019_01_31_07_16.csv',
  'toptracker_2019_01_31_07_18.csv',
]

const ChartPage: NextFC = () => {
  return (
    <Layout>
      {files.map(filename => (
        <TimesheetChart key={filename} filename={filename} />
      ))}
    </Layout>
  )
}

ChartPage.getInitialProps = async () => {
  const results = await Promise.all(
    files.map(filename => timesheetFetcher.get({ filename }))
  )

  return {
    initialCache: new Map([[CacheKey.TIMESHEET, results]]),
  }
}

export default ChartPage
