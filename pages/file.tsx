import { NextFC } from 'next'
import { useCallback, useState } from 'react'
import { fileListFetcher } from '../common/fetchers'
import { endsWith } from '../common/string'
import Card from '../components/base/Card'
import CsvFile from '../components/CsvFile'
import FileList from '../components/FileList'
import FileUpload from '../components/FileUpload'
import JsonFile from '../components/JsonFile'
import Layout from '../layout'
import { CacheKey } from '../state/CacheState'

const FilePage: NextFC = () => {
  const [filename, setFilename] = useState<string | undefined>(undefined)

  const onSelect = useCallback((f: string) => setFilename(f), [])

  return (
    <Layout requireAuth={true}>
      <Card>
        <FileUpload />
      </Card>
      <Card>
        <FileList onSelect={onSelect} />
        {filename ? (
          endsWith(filename, '.csv') ? (
            <CsvFile filename={filename} />
          ) : endsWith(filename, '.json') ? (
            <JsonFile filename={filename} />
          ) : (
            `Cannot display file type: ${filename}`
          )
        ) : (
          'No file selected'
        )}
      </Card>
    </Layout>
  )
}

FilePage.getInitialProps = async () => {
  const result = await fileListFetcher.get({})
  return {
    initialCache: new Map([[CacheKey.FILE_LIST, [result]]]),
  }
}

export default FilePage
