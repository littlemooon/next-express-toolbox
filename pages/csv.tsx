import { NextFC } from 'next'
import { useCallback, useState } from 'react'
import { fileListFetcher } from '../common/fetchers'
import { endsWith } from '../common/string'
import ErrorBox from '../components/base/ErrorBox'
import Spinner from '../components/base/Spinner'
import Csv from '../components/Csv'
import FileList from '../components/FileList'
import FileUpload from '../components/FileUpload'
import Layout from '../layout'

export interface ICsvProps {
  fileListFetcher: typeof fileListFetcher
}

const CsvPage: NextFC<ICsvProps> = props => {
  const [filename, setFilename] = useState<string | undefined>(undefined)

  const onSelect = useCallback((f: string) => setFilename(f), [])

  return (
    <Layout>
      <FileUpload />
      <FileList fileListFetcher={props.fileListFetcher} onSelect={onSelect} />
      <Spinner />
      <ErrorBox header="Test error">{'some message'}</ErrorBox>
      {filename ? (
        endsWith(filename, '.csv') ? (
          <Csv filename={filename} />
        ) : (
          `Cannot display file type: ${filename}`
        )
      ) : (
        'No file selected'
      )}
    </Layout>
  )
}

CsvPage.getInitialProps = async (): Promise<ICsvProps> => {
  await fileListFetcher.get()
  return {
    fileListFetcher,
  }
}

export default CsvPage
