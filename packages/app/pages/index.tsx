import Button from 'common/components/base/Button'
import Card from 'common/components/base/Card'
import ErrorBox from 'common/components/base/ErrorBox'
import Input from 'common/components/base/Input'
import Spinner from 'common/components/base/Spinner'
import Text, {
  TextA,
  TextH1,
  TextH2,
  TextH3,
  TextH4,
  TextH5,
  TextH6,
} from 'common/components/base/Text'
import Layout from 'common/layout'
import { NextFC } from 'next'

const IndexPage: NextFC = () => {
  return (
    <Layout>
      <Card>
        <TextH1>Header 1</TextH1>
        <TextH2>Header 2</TextH2>
        <TextH3>Header 3</TextH3>
        <TextH4>Header 4</TextH4>
        <TextH5>Header 5</TextH5>
        <TextH6>Header 6</TextH6>
        <TextA>TextA</TextA>
        <Text>
          Multiline text Multiline text Multiline text Multiline text Multiline
          text Multiline text Multiline text Multiline text Multiline text
          Multiline text Multiline text Multiline text Multiline text Multiline
          text Multiline text Multiline text Multiline text Multiline text
          Multiline text Multiline text Multiline text Multiline text Multiline
          text Multiline text Multiline text Multiline text Multiline text
          Multiline text Multiline text
        </Text>
        <Button>Button</Button>
        <Input placeholder="input" />
        <Spinner />
        <ErrorBox header="Test error with children">{'some text'}</ErrorBox>
        <ErrorBox
          header="Test error with error"
          error={new Error('bloop bloop')}
        />
      </Card>
    </Layout>
  )
}

export default IndexPage
