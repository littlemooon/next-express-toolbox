import { NextFC } from 'next'
import Card from '../components/base/Card'
import Text from '../components/base/Text'
import Json from '../components/Json'
import Layout from '../layout'
import { ServerContext } from '../state/ServerState'

const UserPage: NextFC = () => (
  <Layout>
    <ServerContext.Consumer>
      {serverState => (
        <Card>
          {serverState.user ? (
            <Json data={serverState.user} />
          ) : (
            <Text>{'Not logged in'}</Text>
          )}
        </Card>
      )}
    </ServerContext.Consumer>
  </Layout>
)
export default UserPage
