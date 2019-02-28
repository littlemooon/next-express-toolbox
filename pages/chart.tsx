import { NextFC } from 'next'
import { timesheetFetcher } from '../common/fetchers/index'
import Card from '../components/base/Card'
import Grid from '../components/base/Grid'
import TimesheetChart from '../components/chart/TimesheetChart'
import Layout from '../layout'
import { CacheKey } from '../state/CacheState'

const files = [
  'toptracker_2019_01_31_07_16.csv',
  'toptracker_2019_01_31_07_18.csv',
]

const ChartPage: NextFC = () => {
  return (
    <Layout requireAuth={true}>
      <Grid
        gridTemplateColumns={['1fr 1fr', '1fr', '1fr 1fr 1fr']}
        gridColumnGap={4}
        gridRowGap={4}
      >
        {[...files, ...files, ...files, ...files].map(filename => (
          <Card key={filename}>
            <TimesheetChart filename={filename} />
          </Card>
        ))}
      </Grid>
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
