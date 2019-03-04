import to from 'await-to-js'
import * as Busboy from 'busboy'
import config from 'common/config'
import log from 'common/log'
import { endsWith } from 'common/string'
import * as csv from 'csvtojson'
import * as fs from 'fs'
import * as path from 'path'
import app from '../app'
import { readDirAsync, readFileAsync } from '../lib/file-utils'

// if (!fs.existsSync(FILE_DIR)) {
//   fs.mkdirSync(FILE_DIR)
// }

app.get('/', async (_, res) => {
  try {
    const [err, filenames] = await to(readDirAsync(config.FILE_DIR))
    if (err) {
      res
        .status(500)
        .send({ status: 'unable_to_read_dir', message: err.message })
    }
    res.send(filenames)
  } catch (e) {
    log.error('getFiles:', e)
    res.status(500).send({ status: 'unable_to_get_files', message: e.message })
  }
})

app.get('/:filename', async (req, res) => {
  try {
    const filename = req.params.filename

    if (endsWith(filename, '.csv')) {
      const json = await csv().fromFile(`${config.FILE_DIR}/${filename}`)
      res.send(json)
    } else if (endsWith(filename, '.json')) {
      const json = await readFileAsync(`${config.FILE_DIR}/${filename}`)
      res.send(json)
    } else {
      res.status(500).send({
        status: 'unknown_file_type',
        message: `File is not of type csv or json: ${filename}`,
      })
    }
  } catch (e) {
    log.error('getFile:', e)
    res.status(500).send({ status: 'unable_to_get_file', message: e.message })
  }
})

app.post('/', async (req, res) => {
  try {
    const busboy = new Busboy({ headers: req.headers })

    busboy.on('file', (filename, file) => {
      const saveTo = path.join(
        process.cwd(),
        '/',
        config.FILE_DIR,
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
    log.error('saveFile:', e)
    res.status(500).send({ status: 'unable_to_save_file', message: e.message })
  }
})

export default app
