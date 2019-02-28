import * as express from 'express'
import { google } from 'googleapis'
import { DATA_FOLDER, DRIVE_FOLDERS } from '../../common/constants'
import { getAuthClient } from '../routes/auth'
import { getSession, setSessionFolder } from './session-utils'

export async function getDrive(req: express.Request) {
  const drive = google.drive({ version: 'v3', auth: getAuthClient(req) })

  if (!getSession(req).folders[DATA_FOLDER]) {
    const { data } = await drive.files.list()

    const existingDataFolder =
      data.files && data.files.find(file => file.name === DATA_FOLDER)

    const dataFolderId = existingDataFolder
      ? existingDataFolder.id
      : await createDriveFolder(req, DATA_FOLDER)

    if (!dataFolderId) {
      throw new Error('Failed to create drive data folder')
    }

    setSessionFolder(req, { [DATA_FOLDER]: dataFolderId })

    await Promise.all(
      Object.keys(DRIVE_FOLDERS).map(async name => {
        const existingFolder =
          data.files && data.files.find(file => file.name === name)

        const folderId = existingFolder
          ? existingFolder.id
          : await createDriveFolder(req, name, {
              parents: [dataFolderId],
            })

        setSessionFolder(req, {
          [name]: folderId,
        })
      })
    )
  }

  return drive
}

async function createDriveFolder(
  req: express.Request,
  name: string,
  resource?: Partial<{
    parents: string[]
  }>
) {
  const drive = await getDrive(req)
  const { data } = await drive.files.create({
    resource: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      ...resource,
    },
    fields: 'id',
  } as any)
  return data.id
}
