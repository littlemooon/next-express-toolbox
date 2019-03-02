import { NextFC } from 'next'
import { useCallback, useState } from 'react'
import { driveListFetcher } from '../common/fetchers/index'
import { TextH1 } from '../components/base/Text'
import DriveList from '../components/DriveList'
import DriveUpload from '../components/DriveUpload'
import Layout from '../layout'
import { CacheKey } from '../state/CacheState'

const DrivePage: NextFC = () => {
  const [id, setId] = useState<string | undefined>(undefined)

  const onSelect = useCallback((x: string) => setId(x), [])

  return (
    <Layout requireAuth={true}>
      <TextH1>{`Selected: ${id}`}</TextH1>
      <DriveUpload folder="timesheet" />
      <DriveList onSelect={onSelect} />
      <DriveList onSelect={onSelect} folder="timesheet" />
    </Layout>
  )
}

DrivePage.getInitialProps = async ctx => {
  driveListFetcher.setToken(ctx)

  return {
    initialCache: new Map([
      [
        CacheKey.DRIVE_LIST,
        await Promise.all([
          driveListFetcher.get({}),
          driveListFetcher.get({ folder: 'timesheet' }),
        ]),
      ],
    ]),
  }
}

export default DrivePage
