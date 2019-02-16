import { ChangeEvent, SFC, useCallback, useEffect, useState } from 'react'
import { FetchState } from '../common/Fetch'
import { fileListFetcher } from '../common/fetchers/index'
import useFetch from '../common/hooks/useFetch'
import { CacheKey } from '../state/CacheState'
import ErrorBox from './base/ErrorBox'
import Input from './base/Input'
import Spinner from './base/Spinner'
import Text from './base/Text'

export interface IFileUploadProps {
  type?: 'text/csv'
  multiple?: boolean
}

function getFormData(files: FileList) {
  const formData = new FormData()

  Array.from(new Array(files.length)).map((_, i) => {
    const file = files.item(i)
    if (file) {
      formData.append(file.name, file)
    }
  })

  return formData
}

const FileUpload: SFC<IFileUploadProps> = props => {
  const [files, setFiles] = useState<FileList | null | undefined>(undefined)
  const fetch = useFetch(CacheKey.FILE_LIST, fileListFetcher)

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files)
  }, [])

  useEffect(() => {
    if (files) {
      fetch.post({}, { body: getFormData(files) })
      setFiles(undefined)
    }
  }, [files])

  return (
    <>
      <Text>Select files to upload:</Text>
      {fetch.state === FetchState.LOADING ? (
        <Spinner />
      ) : fetch.state === FetchState.ERROR ? (
        <ErrorBox header="Failed to upload file" error={fetch.error} />
      ) : (
        ''
      )}
      <Input
        type="file"
        accept={props.type}
        onChange={onChange}
        multiple={props.multiple}
      />
    </>
  )
}

FileUpload.defaultProps = {
  // type: 'text/csv',
  multiple: true,
}

export default FileUpload
