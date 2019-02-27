import * as dotenv from 'dotenv'

export default function loadEnv() {
  dotenv.config({ path: '.env' })
  dotenv.config({ path: '.env.server' })
}
