import { SFC, useCallback } from 'react'
import { fileListFetcher } from '../common/fetchers'
import useCache from '../common/hooks/useCache'
import useFetch from '../common/hooks/useFetch'
import { IFileList } from '../common/types'
import { CacheKey } from '../state/CacheState'
import Text from './base/Text'

export interface IFileListProps {
  fileListFetcher: typeof fileListFetcher
  onSelect: (filename: string) => void
}

const FileList: SFC<IFileListProps> = props => {
  const cacheState = useCache<IFileList>(
    CacheKey.CSV_LIST,
    props.fileListFetcher
  )

  const csvFetch = useFetch<IFileList>(fileListFetcher, {
    runOnMount: true,
    cacheState,
  })

  const onClick = useCallback(
    (filename: string) => () => props.onSelect(filename),
    []
  )

  return csvFetch.data ? (
    <>
      {csvFetch.data.map(filename => (
        <p key={filename} onClick={onClick(filename)}>
          {filename}
        </p>
      ))}
    </>
  ) : (
    <Text>{'No csv files uploaded'}</Text>
  )
}

export default FileList
