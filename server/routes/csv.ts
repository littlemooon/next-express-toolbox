import to from 'await-to-js'
import * as Busboy from 'busboy'
import * as csv from 'csvtojson'
import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import { FILE_DIR } from '../../common/constants'
import { error } from '../../common/log'
import { readDirAsync } from '../utils/file'

if (!fs.existsSync(`${FILE_DIR}/csv`)) {
  fs.mkdirSync(`${FILE_DIR}/csv`)
}

async function saveCsv(req: express.Request, res: express.Response) {
  try {
    const busboy = new Busboy({ headers: req.headers })

    busboy.on('file', (filename, file) => {
      const saveTo = path.join(
        process.cwd(),
        '/',
        FILE_DIR,
        '/csv/',
        path.basename(filename)
      )
      file.pipe(fs.createWriteStream(saveTo))
    })

    busboy.on('finish', () => res.status(200))

    return req.pipe(busboy)
  } catch (e) {
    error('saveCsv:', e)
    res.status(500).send({ status: 'unknown_error', message: e.message })
  }
}

async function getCsvs(_: express.Request, res: express.Response) {
  try {
    const [err, filenames] = await to(readDirAsync(`${FILE_DIR}/csv`))
    if (err) {
      res
        .status(500)
        .send({ status: 'unable_to_read_dir', message: err.message })
    }
    res.send(filenames)
  } catch (e) {
    error('getCsvs:', e)
    res.status(500).send({ status: 'unknown_error', message: e.message })
  }
}

export async function getCsv(req: express.Request, res: express.Response) {
  try {
    const filename = req.params[0]
    const json = await csv().fromFile(`${FILE_DIR}/csv/${filename}`)
    res.send(json)
  } catch (e) {
    error('getCsv:', e)
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
