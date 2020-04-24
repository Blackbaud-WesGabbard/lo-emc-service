const puppeteer = require('puppeteer')

const Auth = async ({ username, password, domain }, nextUrl) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`${domain}/UserLogin`)
  await page.click('#USERNAME')
  await page.keyboard.type(username)
  await page.click('#Password')
  await page.keyboard.type(password)
  await page.click('#login')
  await page.goto(nextUrl)
  return {
    auth: nextUrl === page.url(),
    page
  }
}

module.exports = Auth;
