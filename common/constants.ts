export const DEV = process.env.NODE_ENV !== 'production'

export const PORT = process.env.PORT || 4000
export const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`

export const COOKIE_SESSION_KEY = process.env.COOKIE_SESSION_KEY

export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

export const FILE_DIR = 'tmp'
