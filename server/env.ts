import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.server' })

export default {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'asd',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'asd',
  GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL || 'asd',
  COOKIE_SESSION_KEY: process.env.COOKIE_SESSION_KEY || 'asd',
}
