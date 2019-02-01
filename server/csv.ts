import * as Busboy from 'busboy'
import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import { error } from '../common/log'

async function saveCsv(req: express.Request, res: express.Response) {
  try {
    const busboy = new Busboy({ headers: req.headers })

    busboy.on('file', (fieldname, file) => {
      const saveTo = path.join(process.cwd(), '/tmp/', path.basename(fieldname))
      file.pipe(fs.createWriteStream(saveTo))
    })

    busboy.on('finish', () => {
      res.writeHead(200, { Connection: 'close' })
      res.end("That's all folks!")
    })

    return req.pipe(busboy)
  } catch (e) {
    error(e)
    res.status(500).send({ status: 'unknown_error', message: e.message })
  }
}

export default function() {
  const app = express()

  app.post('*', saveCsv)

  return app
}
