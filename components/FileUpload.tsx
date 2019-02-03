import { ChangeEvent, SFC, useCallback, useEffect, useState } from 'react'
import Fetch from '../common/Fetch'
import { fileListFetcher } from '../common/fetchers'
import Input from './base/Input'

export interface IFileUploadProps {
  type?: 'text/csv'
  multiple?: boolean
}

export interface IFileData {
  files?: FileList
}

function uploadFiles(fetcher: Fetch<any>, files: FileList) {
  const formData = new FormData()

  Array.from(new Array(files.length)).map((_, i) => {
    const file = files.item(i)
    if (file) {
      formData.append(file.name, file)
    }
  })

  return fetcher.post('', formData)
}

const FileUpload: SFC<IFileUploadProps> = props => {
  const [data, setData] = useState<IFileData>({})

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setData({
      files: e.target.files || undefined,
    })
  }, [])

  useEffect(() => {
    if (data.files) {
      uploadFiles(fileListFetcher, data.files)
      setData({})
    }
  }, [data])

  return (
    <Input
      type="file"
      accept={props.type}
      onChange={onChange}
      multiple={props.multiple}
    />
  )
}

FileUpload.defaultProps = {
  type: 'text/csv',
  multiple: true,
}
export default FileUpload
