import config from 'common/config'
import * as dotenv from 'dotenv'

dotenv.config()

export default {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'asd',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'asd',
  GOOGLE_REDIRECT_URL: `${config.SERVER_URL}${process.env.GOOGLE_REDIRECT_URL ||
    'asd'}`,
  COOKIE_SESSION_KEYS: [
    process.env.COOKIE_SESSION_KEY1 || 'oVHd.xK*V%Lnj4k6$Z)XVcN69ozBwGasd',
    process.env.COOKIE_SESSION_KEY2 || '4of^LzsJ&}?ZpfTt4XkXnMK{r7LK2w',
  ],
}
