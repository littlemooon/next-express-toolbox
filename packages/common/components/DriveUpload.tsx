import { SFC, useRef } from 'react'
import { FetchState } from '../Fetch'
import { driveListFetcher } from '../fetchers/index'
import useFetch from '../hooks/useFetch'
import { CacheKey } from '../state/CacheState'
import theme from '../theme'
import { TDriveFolder } from '../types'
import Button from './base/Button'
import Card from './base/Card'
import ErrorBox from './base/ErrorBox'
import Flex from './base/Flex'
import Input from './base/Input'
import Spinner from './base/Spinner'
import Text from './base/Text'

export interface IDriveUploadProps {
  type?: 'text/csv'
  multiple?: boolean
  folder?: TDriveFolder
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

const DriveUpload: SFC<IDriveUploadProps> = p => {
  const ref = useRef<HTMLInputElement | undefined>(undefined)
  const fetch = useFetch(CacheKey.DRIVE_LIST, driveListFetcher)

  const onUpload = async () => {
    if (ref.current) {
      const files = ref.current.files
      if (files && files.length) {
        await fetch.post({ folder: p.folder }, { body: getFormData(files) })
        ref.current.files = null
        ref.current.value = ''
        await fetch.get({ folder: p.folder })
      }
    }
  }

  return (
    <>
      <Card>
        <Flex alignItems="flex-start">
          <Text mb={2}>Select files to upload:</Text>
          {fetch.state === FetchState.ERROR && (
            <ErrorBox header="Failed to upload file" error={fetch.error} />
          )}
          <Input
            type="file"
            accept={p.type}
            multiple={p.multiple}
            ref={ref}
            mb={2}
          />
          <Button onClick={onUpload}>
            Upload
            {fetch.state === FetchState.LOADING && <Spinner bg={theme.white} />}
          </Button>
        </Flex>
      </Card>
    </>
  )
}

DriveUpload.defaultProps = {
  // type: 'text/csv',
  multiple: true,
}

export default DriveUpload
