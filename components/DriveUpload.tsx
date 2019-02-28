import { SFC, useRef } from 'react'
import { FetchState } from '../common/Fetch'
import { timesheetListFetcher } from '../common/fetchers/index'
import useFetch from '../common/hooks/useFetch'
import theme from '../common/theme'
import { CacheKey } from '../state/CacheState'
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

const DriveUpload: SFC<IDriveUploadProps> = props => {
  const ref = useRef<HTMLInputElement | undefined>(undefined)
  const fetch = useFetch(CacheKey.TIMESHEET_LIST, timesheetListFetcher)

  const onUpload = async () => {
    if (ref.current) {
      const files = ref.current.files
      if (files && files.length) {
        await fetch.post({}, { body: getFormData(files) })
        ref.current.files = null
        ref.current.value = ''
        await fetch.get({})
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
      </Card>
    </>
  )
}

DriveUpload.defaultProps = {
  // type: 'text/csv',
  multiple: true,
}

export default DriveUpload
