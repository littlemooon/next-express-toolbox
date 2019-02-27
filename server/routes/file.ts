import to from 'await-to-js'
import * as Busboy from 'busboy'
import * as csv from 'csvtojson'
import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import { FILE_DIR } from '../../common/constants'
import { error } from '../../common/log'
import { endsWith } from '../../common/string'
import { readDirAsync, readFileAsync } from '../utils/file-utils'

if (!fs.existsSync(FILE_DIR)) {
  fs.mkdirSync(FILE_DIR)
}

async function getFiles(_: express.Request, res: express.Response) {
  try {
    const [err, filenames] = await to(readDirAsync(FILE_DIR))
    if (err) {
      res
        .status(500)
        .send({ status: 'unable_to_read_dir', message: err.message })
    }
    res.send(filenames)
  } catch (e) {
    error('getFiles:', e)
    res.status(500).send({ status: 'unable_to_get_files', message: e.message })
  }
}

export async function getFile(req: express.Request, res: express.Response) {
  try {
    const filename = req.params.filename

    if (endsWith(filename, '.csv')) {
      const json = await csv().fromFile(`${FILE_DIR}/${filename}`)
      res.send(json)
    } else if (endsWith(filename, '.json')) {
      const json = await readFileAsync(`${FILE_DIR}/${filename}`)
      res.send(json)
    } else {
      res.status(500).send({
        status: 'unknown_file_type',
        message: `File is not of type csv or json: ${filename}`,
      })
    }
  } catch (e) {
    error('getFile:', e)
    res.status(500).send({ status: 'unable_to_get_file', message: e.message })
  }
}

async function saveFile(req: express.Request, res: express.Response) {
  try {
    const busboy = new Busboy({ headers: req.headers })

    busboy.on('file', (filename, file) => {
      const saveTo = path.join(
        process.cwd(),
        '/',
        FILE_DIR,
        '/',
        path.basename(filename)
      )
      file.pipe(fs.createWriteStream(saveTo))
    })

    busboy.on('finish', () => {
      res.status(200)
      res.end()
    })

    return req.pipe(busboy)
  } catch (e) {
    error('saveFile:', e)
    res.status(500).send({ status: 'unable_to_save_file', message: e.message })
  }
}

export default function() {
  const router = express.Router()

  router.get('/', getFiles)
  router.get('/:filename', getFile)
  router.post('/', saveFile)

  return router
}
