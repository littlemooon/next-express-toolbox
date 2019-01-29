import * as express from 'express'
import * as next from 'next'
import { DEV, PORT } from '../common/config'
import { error, log } from '../common/log'
import renderPdf from './pdf'

const app = next({ dev: DEV })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/pdf/*', async (req, res) => renderPdf(req, res))

    server.get('*', (req, res) => handle(req, res))

    server.listen(PORT, (err: Error) => {
      if (err) {
        throw err
      }
      log(`> Ready on http://localhost:${PORT}`)
    })
  })
  .catch(ex => {
    error(ex.stack)
    process.exit(1)
  })
