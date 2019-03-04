import Button from 'common/components/base/Button'
import Card from 'common/components/base/Card'
import ErrorBox from 'common/components/base/ErrorBox'
import Flex from 'common/components/base/Flex'
import Input from 'common/components/base/Input'
import Spinner from 'common/components/base/Spinner'
import Text from 'common/components/base/Text'
import { FetchState } from 'common/Fetch'
import { driveListFetcher } from 'common/fetchers/index'
import useFetch from 'common/hooks/useFetch'
import { CacheKey } from 'common/state/CacheState'
import theme from 'common/theme'
import { TDriveFolder } from 'common/types'
import { SFC, useRef } from 'react'

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
