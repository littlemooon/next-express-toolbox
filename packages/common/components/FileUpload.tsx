import { SFC, useRef } from 'react'
import { FetchState } from '../Fetch'
import { fileListFetcher } from '../fetchers/index'
import useFetch from '../hooks/useFetch'
import { CacheKey } from '../state/CacheState'
import theme from '../theme'
import Button from './base/Button'
import ErrorBox from './base/ErrorBox'
import Flex from './base/Flex'
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
  const ref = useRef<HTMLInputElement | undefined>(undefined)
  const fetch = useFetch(CacheKey.FILE_LIST, fileListFetcher)

  const onUpload = async () => {
    if (ref.current) {
      const files = ref.current.files
      if (files && files.length) {
        await fetch.post({}, { body: getFormData(files) })
        ref.current.files = null
        ref.current.value = ''
      }
    }
  }

  return (
    <>
      <Flex alignItems="flex-start">
        <Text mb={2}>Select files to upload:</Text>
        {fetch.state === FetchState.ERROR && (
          <ErrorBox header="Failed to upload file" error={fetch.error} />
        )}
        <Input
          type="file"
          accept={props.type}
          multiple={props.multiple}
          ref={ref}
          mb={2}
        />
        <Button onClick={onUpload}>
          Upload
          {fetch.state === FetchState.LOADING && <Spinner bg={theme.white} />}
        </Button>
      </Flex>
    </>
  )
}

FileUpload.defaultProps = {
  // type: 'text/csv',
  multiple: true,
}

export default FileUpload
