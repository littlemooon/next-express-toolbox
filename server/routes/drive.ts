import * as express from 'express'
import log from '../../common/log'
import { getDrive } from '../utils/drive-utils'

export default function() {
  const router = express.Router()

  router.get('/', async (req, res) => {
    try {
      const { data } = await getDrive(req).files.list()
      return res.send(data)
    } catch (e) {
      log.error('api/drive/:', e)
      res
        .status(500)
        .send({ status: 'unable_to_get_files', message: e.message })
    }
  })

  router.get('/:fileId', async (req, res) => {
    try {
      const { data } = await getDrive(req).files.get({
        fileId: req.params.fileId,
      })
      return res.send(data)
    } catch (e) {
      log.error('getDriveFile:', e)
      res.status(500).send({ status: 'unable_to_get_file', message: e.message })
    }
  })

  return router
}
