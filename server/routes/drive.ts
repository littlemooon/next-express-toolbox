import to from 'await-to-js'
import * as Busboy from 'busboy'
import * as express from 'express'
import * as fs from 'fs'
import { google } from 'googleapis'
import * as path from 'path'
import { FILE_DIR } from '../../common/constants'
import log from '../../common/log'
import { getAuthClient } from './auth'

const getDrive = (req: express.Request) => {
  return google.drive({ version: 'v3', auth: getAuthClient(req) })
}

async function getDriveFiles(req: express.Request, res: express.Response) {
  try {
    const [err, driveRes] = await to(getDrive(req).files.list())

    if (err) {
      throw err
    } else if (!driveRes) {
      throw new Error('No response from drive')
    } else {
      return res.send(driveRes.data)
    }
  } catch (e) {
    log.error('getDriveFiles:', e)
    res.status(500).send({ status: 'unable_to_get_files', message: e.message })
  }
}

export async function getDriveFile(
  req: express.Request,
  res: express.Response
) {
  try {
    const fileId = req.params.fileId

    const [err, driveRes] = await to(getDrive(req).files.get({ fileId }))

    if (err) {
      throw err
    } else if (!driveRes) {
      throw new Error('No response from drive')
    } else {
      return res.send(driveRes.data)
    }
  } catch (e) {
    log.error('getDriveFile:', e)
    res.status(500).send({ status: 'unable_to_get_file', message: e.message })
  }
}

async function saveDriveFile(req: express.Request, res: express.Response) {
  try {
    const busboy = new Busboy({ headers: req.headers })

    busboy.on('file', (fileId, file) => {
      const saveTo = path.join(
        process.cwd(),
        '/',
        FILE_DIR,
        '/',
        path.basename(fileId)
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
}

export default function() {
  const router = express.Router()

  router.get('/', getDriveFiles)
  router.get('/:fileId', getDriveFile)
  router.post('/', saveDriveFile)

  return router
}
