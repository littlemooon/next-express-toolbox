import * as express from 'express'
import * as httpProxy from 'http-proxy'
import { error } from '../../common/log'

export default function() {
  const proxy = httpProxy.createProxyServer({
    changeOrigin: true,
  })

  const api = express()

  api.use('/github', (req, res) =>
    proxy.web(req, res, { target: 'https://api.github.com' }, (err: Error) => {
      if (err) {
        error('/github:', err)
        res.status(500).send({ status: 'unknown_error', message: err.message })
      }
    })
  )

  return api
}
