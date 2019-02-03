import to from 'await-to-js'
import * as Busboy from 'busboy'
import * as csv from 'csvtojson'
import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import { error } from '../common/log'
import { readDirAsync } from './utils/file'

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

async function getCsvs(_: express.Request, res: express.Response) {
  try {
    const [err, filenames] = await to(readDirAsync(`tmp`))
    if (err) {
      error(err)
      res
        .status(500)
        .send({ status: 'unable_to_read_tmp', message: err.message })
    }
    res.send(filenames)
  } catch (e) {
    error(e)
    res.status(500).send({ status: 'unknown_error', message: e.message })
  }
}

async function getCsv(req: express.Request, res: express.Response) {
  try {
    const filename = req.params[0]
    const json = await csv().fromFile(`tmp/${filename}`)
    res.send(json)
  } catch (e) {
    error(e)
    res.status(500).send({ status: 'unknown_error', message: e.message })
  }
}

export default function() {
  const app = express()

  app.get('/', getCsvs)
  app.get('/*', getCsv)
  app.post('*', saveCsv)

  return app
}
