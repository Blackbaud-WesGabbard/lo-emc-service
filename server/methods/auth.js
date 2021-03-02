const puppeteer = require('puppeteer')
import { sendError } from '../lib/json'

const Auth = async ({ sessionId, url }) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  try {
    await page.setExtraHTTPHeaders({ 'Cookie': `JSESSIONID=${sessionId}` })
    await page.goto(url)
    if (url === page.url()) {
      return {
        auth: true,
        page
      }
    } else {
      throw new Error(`Login failed - redirected to ${page.url()}`)
    }
  } catch (error) {
    browser.close()
    return sendError(error.message, { target: 'login' })
  }
}

module.exports = Auth;
