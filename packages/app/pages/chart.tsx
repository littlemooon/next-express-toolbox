import Card from 'common/components/base/Card'
import Grid from 'common/components/base/Grid'
import TimesheetChart from 'common/components/chart/TimesheetChart'
import { timesheetFetcher } from 'common/fetchers/index'
import Layout from 'common/layout/index'
import { CacheKey } from 'common/state/CacheState'
import { NextFC } from 'next'

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

ChartPage.getInitialProps = async ctx => {
  timesheetFetcher.setToken(ctx)

  return {
    initialCache: new Map([
      [
        CacheKey.TIMESHEET,
        await Promise.all(
          files.map(filename => timesheetFetcher.get({ filename }))
        ),
      ],
    ]),
  }
}

export default ChartPage
