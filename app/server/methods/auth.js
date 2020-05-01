const puppeteer = require('puppeteer')

const Auth = async ({ username, password, domain }, nextUrl) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  try {
    await page.goto(`${domain}/UserLogin`)
    await page.click('#USERNAME')
    await page.keyboard.type(username)
    await page.click('#Password')
    await page.keyboard.type(password)
    await page.click('#login')
    await page.goto(nextUrl)
    console.log(page.url(), nextUrl)
    if (nextUrl === page.url()) {
      return {
        auth: true,
        page
      }
    } else {
      throw new Error()
    }
  } catch (error) {
    console.log('auth error', error)
    browser.close()
    return {
      error: 'Login Failed'
    }
  }
}

module.exports = Auth;
