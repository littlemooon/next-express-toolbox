// import config from 'common/config'
import log from 'common/log'
// import * as puppeteer from 'puppeteer'
// import * as qs from 'query-string'
import app from '../app'
// import { getSession } from '../lib/session-utils'

app.get('*', async (_, res) => {
  try {
    // const browser = await puppeteer.launch()
    // const page = await browser.newPage()
    // const path = req.params[0]
    // const tokens = getSession(req).tokens
    // const query = qs.stringify({
    //   ...req.query,
    //   token: tokens ? tokens.access_token : undefined,
    // })
    // await page.goto(`${config.BASE_URL}${path}?${query}`)
    // const buffer = await page.pdf({ format: 'A4' })
    // res.type('application/pdf')
    // res.send(buffer)
    // browser.close()
  } catch (e) {
    log.error('routes/pdf', e)
    res.status(500).send({ status: 'failed_to_render_pdf', message: e.message })
  }
})

export default app
