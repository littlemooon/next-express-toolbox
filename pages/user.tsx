import d from 'dot-prop'
import { NextFC } from 'next'
import Card from '../components/base/Card'
import Text from '../components/base/Text'
import Layout from '../layout'
import { ServerContext } from '../state/ServerState'

const UserPage: NextFC = () => (
  <Layout>
    <ServerContext.Consumer>
      {serverState => (
        <Card>
          {serverState.user ? (
            <section>
              {Object.keys(serverState.user).map(k => {
                const v = d.get(serverState, `user.${k}`)
                return (
                  <Text key={k} my={2}>{`${k}: ${JSON.stringify(v)}`}</Text>
                )
              })}
            </section>
          ) : (
            <Text>{'Not logged in'}</Text>
          )}
        </Card>
      )}
    </ServerContext.Consumer>
  </Layout>
)
export default UserPage
