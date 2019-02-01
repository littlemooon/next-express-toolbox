import * as express from 'express'
import * as puppeteer from 'puppeteer'
import * as qs from 'query-string'
import { BASE_URL } from '../common/config'
import { error } from '../common/log'

async function renderPdf(req: express.Request, res: express.Response) {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    const path = req.params[0]
    const query = qs.stringify(req.query)

    await page.goto(`${BASE_URL}/${path}?${query}`)

    const buffer = await page.pdf({ format: 'A4' })

    res.type('application/pdf')
    res.send(buffer)

    browser.close()
  } catch (e) {
    error(e)
    res.status(500).send({ status: 'unknown_error', message: e.message })
  }
}

const app = express()

app.get('/pdf/*', renderPdf)

export default app
