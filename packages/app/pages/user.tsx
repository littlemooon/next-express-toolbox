import Card from 'common/components/base/Card'
import Text from 'common/components/base/Text'
import Json from 'common/components/Json'
import Layout from 'common/layout/index'
import { AuthContext } from 'common/state/AuthState'
import { NextFC } from 'next'

const UserPage: NextFC = () => (
  <Layout>
    <AuthContext.Consumer>
      {authState => (
        <Card>
          {authState.user ? (
            <Json data={authState.user} />
          ) : (
            <Text>{'Not logged in'}</Text>
          )}
        </Card>
      )}
    </AuthContext.Consumer>
  </Layout>
)
export default UserPage
