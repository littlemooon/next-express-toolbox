import Card from 'common/components/base/Card'
import CsvFile from 'common/components/CsvFile'
import FileList from 'common/components/FileList'
import FileUpload from 'common/components/FileUpload'
import JsonFile from 'common/components/JsonFile'
import { fileListFetcher } from 'common/fetchers'
import Layout from 'common/layout/index'
import { CacheKey } from 'common/state/CacheState'
import { endsWith } from 'common/string'
import { NextFC } from 'next'
import { useCallback, useState } from 'react'

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

FilePage.getInitialProps = async ctx => {
  fileListFetcher.setToken(ctx)

  return {
    initialCache: new Map([
      [CacheKey.FILE_LIST, [await fileListFetcher.get({})]],
    ]),
  }
}

export default FilePage
