import * as express from 'express'
import * as httpProxy from 'http-proxy'

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
})

const api = express()

api.use('/github', (req, res) =>
  proxy.web(req, res, { target: 'https://api.github.com' }, (error: Error) => {
    if (error) {
      res.status(500).send({ status: 'unknown_error', message: error.message })
    }
  })
)

export default api
