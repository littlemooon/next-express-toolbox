import { NextFC } from 'next'
import FileUpload from '../components/FileUpload'
import Layout from '../layout'

const Index: NextFC = () => {
  return (
    <Layout>
      This is the index page
      <FileUpload />
    </Layout>
  )
}

export default Index
