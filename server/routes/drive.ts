import * as Busboy from 'busboy'
import * as express from 'express'
import { DATA_FOLDER } from '../../common/constants'
import log from '../../common/log'
import { getDrive } from '../utils/drive-utils'
import { getSession, ISessionFolders } from '../utils/session-utils'

async function getDriveList(
  req: express.Request,
  res: express.Response,
  folder: keyof ISessionFolders = DATA_FOLDER
) {
  try {
    const folders = getSession(req).folders
    const drive = await getDrive(req)
    const { data } = await drive.files.list({
      q: `'${folders[folder]}' in parents`,
    })
    return res.send(data)
  } catch (e) {
    log.error('getDriveList:', e)
    res
      .status(500)
      .send({ status: 'unable_to_get_drive_list', message: e.message })
  }
}

async function createDriveFile(
  req: express.Request,
  res: express.Response,
  folder: keyof ISessionFolders = DATA_FOLDER
) {
  try {
    const busboy = new Busboy({ headers: req.headers })

    busboy.on('file', async (name, file) => {
      const folders = getSession(req).folders
      const drive = await getDrive(req)
      await drive.files.create({
        resource: {
          name,
          parents: [folders[folder]],
        },
        media: {
          mimeType: 'text/csv',
          body: file,
        },
        fields: 'id',
      } as any)
    })

    busboy.on('finish', () => {
      res.status(200)
      res.end()
    })

    return req.pipe(busboy)
  } catch (e) {
    log.error('createDriveFile:', e)
    res
      .status(500)
      .send({ status: 'unable_to_create_drive_file', message: e.message })
  }
}

export default function() {
  const router = express.Router()

  router.get('/', async (req, res) => {
    return getDriveList(req, res)
  })

  router.get('/:folder', async (req, res) => {
    return getDriveList(req, res, req.params.folder)
  })

  router.get('/file/:fileId', async (req, res) => {
    try {
      const drive = await getDrive(req)
      const { data } = await drive.files.get({
        fileId: req.params.fileId,
      })
      return res.send(data)
    } catch (e) {
      log.error('GET /api/drive/:fileId:', e)
      res.status(500).send({ status: 'unable_to_get_file', message: e.message })
    }
  })

  router.post('/', (req, res) => {
    return createDriveFile(req, res)
  })

  router.post('/:folder', (req, res) => {
    return createDriveFile(req, res, req.params.folder)
  })

  return router
}
