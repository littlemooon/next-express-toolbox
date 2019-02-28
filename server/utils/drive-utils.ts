import * as express from 'express'
import { google } from 'googleapis'
import { getAuthClient } from '../routes/auth'
import { getSession, setSessionFolder } from './session-utils'

export const DATA_FOLDER = 'app_data'

export const DRIVE_FOLDERS = ['timesheet']

export function getDrive(req: express.Request) {
  return google.drive({ version: 'v3', auth: getAuthClient(req) })
}

async function createDriveFolder(
  req: express.Request,
  name: string,
  resource?: Partial<{
    parents: string[]
  }>
) {
  const { data } = await getDrive(req).files.create({
    resource: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      ...resource,
    },
    fields: 'id',
  } as any)
  return data.id
}

export async function setupDrive(req: express.Request) {
  if (getSession(req).folders) {
    return
  }

  const { data } = await getDrive(req).files.list()

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
    DRIVE_FOLDERS.map(async name => {
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
