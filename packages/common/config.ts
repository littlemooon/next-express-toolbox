import { TDriveFolder } from 'common/types/index'

const PORT = process.env.PORT || 4000

const DRIVE_FOLDERS: TDriveFolder[] = ['app_data', 'timesheet', 'log']
const DRIVE_DATA_FOLDER: TDriveFolder = DRIVE_FOLDERS[0]

export default {
  DEV: process.env.NODE_ENV !== 'production',
  APP_NAME: process.env.APP_NAME || 'app',
  PORT,
  BASE_URL: process.env.BASE_URL || `http://localhost:${PORT}`,
  DRIVE_FOLDERS,
  DRIVE_DATA_FOLDER,
  FILE_DIR: 'tmp',
  AUTH_SCOPES: [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/drive.file',
  ],
}
