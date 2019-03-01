import { SFC, useCallback } from 'react'
import { fileListFetcher } from '../common/fetchers'
import useFetch from '../common/hooks/useFetch'
import { CacheKey } from '../state/CacheState'
import Text from './base/Text'

export interface IFileListProps {
  onSelect: (filename: string) => void
}

const FileList: SFC<IFileListProps> = props => {
  const csvFetch = useFetch(CacheKey.FILE_LIST, fileListFetcher, {
    initialUrlParams: {},
  })

  const onClick = useCallback(
    (filename: string) => () => props.onSelect(filename),
    []
  )

  return csvFetch.data ? (
    <>
      {csvFetch.data.map((filename: string) => (
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
