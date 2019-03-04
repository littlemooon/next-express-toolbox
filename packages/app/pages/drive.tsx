import { TextH1 } from 'common/components/base/Text'
import DriveList from 'common/components/DriveList'
import DriveUpload from 'common/components/DriveUpload'
import { driveListFetcher } from 'common/fetchers/index'
import Layout from 'common/layout'
import { CacheKey } from 'common/state/CacheState'
import { NextFC } from 'next'
import { useCallback, useState } from 'react'

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
