import * as Busboy from 'busboy'
import config from 'common/config'
import log from 'common/log'
import { TDriveFolder } from 'common/types/index'
import app from '../app'
import { requireAuth } from '../lib/auth-utils'
import { getDrive } from '../lib/drive-utils'
import { getSession } from '../lib/session-utils'

app.use(requireAuth)

app.get('/:folder?', async (req, res) => {
  const folder = (req.params.folder || config.DRIVE_DATA_FOLDER) as TDriveFolder

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
})

app.get('/file/:fileId', async (req, res) => {
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

app.post('/:folder?', (req, res) => {
  const folder = (req.params.folder || config.DRIVE_DATA_FOLDER) as TDriveFolder

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
})

export default app
