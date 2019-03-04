import log from 'common/log'
import * as httpProxy from 'http-proxy'
import app from '../app'

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
})

app.use('/github', (req, res) =>
  proxy.web(req, res, { target: 'https://api.github.com' }, (err: Error) => {
    if (err) {
      log.error('/github:', err)
      res.status(500).send({ status: 'unknown_error', message: err.message })
    }
  })
)

export default app
