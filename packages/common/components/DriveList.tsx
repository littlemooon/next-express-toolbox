import { SFC, useCallback } from 'react'
import { FetchState } from '../Fetch'
import { driveListFetcher } from '../fetchers/index'
import useFetch from '../hooks/useFetch'
import { CacheKey } from '../state/CacheState'
import { TDriveFolder } from '../types/index'
import Card from './base/Card'
import ErrorBox from './base/ErrorBox'
import Spinner from './base/Spinner'

export interface IDriveListProps {
  folder?: TDriveFolder
  onSelect: (id: string) => void
}

const DriveList: SFC<IDriveListProps> = p => {
  const fetch = useFetch(CacheKey.DRIVE_LIST, driveListFetcher, {
    initialUrlParams: { folder: p.folder },
  })

  const onClick = useCallback((id: string) => () => p.onSelect(id), [])

  return (
    <Card>
      {fetch.state === FetchState.LOADING ? (
        <Spinner />
      ) : fetch.state === FetchState.SUCCESS &&
        fetch.data &&
        fetch.data.files ? (
        <>
          {fetch.data.files.map(({ name, id }) => (
            <p key={id} onClick={onClick(id)}>
              {name}
            </p>
          ))}
        </>
      ) : fetch.state === FetchState.ERROR ? (
        <ErrorBox
          header={'Failed to get files from google drive'}
          error={fetch.error}
        />
      ) : null}
    </Card>
  )
}

export default DriveList
