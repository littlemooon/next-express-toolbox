import { Request, Response } from 'express'
import * as puppeteer from 'puppeteer'
import * as qs from 'query-string'
import { BASE_URL } from '../common/config'
import { error } from '../common/log'

export default async function renderPdf(req: Request, res: Response) {
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
  }
}
