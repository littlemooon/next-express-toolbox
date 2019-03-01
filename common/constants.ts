import { TDriveFolder } from './types/index'
export const DEV = process.env.NODE_ENV !== 'production'

export const APP_NAME = process.env.APP_NAME || 'app'
export const PORT = process.env.PORT || 4000
export const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`

export const DRIVE_FOLDERS: TDriveFolder[] = ['app_data', 'timesheet', 'log']
export const DRIVE_DATA_FOLDER: TDriveFolder = DRIVE_FOLDERS[0]

export const FILE_DIR = 'tmp'
