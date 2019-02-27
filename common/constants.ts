export const DEV = process.env.NODE_ENV !== 'production'

export const APP_NAME = process.env.APP_NAME || 'littlemooon'
export const PORT = process.env.PORT || 4000
export const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`

export const FILE_DIR = 'tmp'
