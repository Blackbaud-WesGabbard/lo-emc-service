const puppeteer = require('puppeteer')

const Eventprops = async ({ content, targetField }, page) => {
  console.log(content)
  const formatContent = decodeURIComponent(content)
  return page.waitForSelector(`input[name="${targetField}"]`)
    .then(() => {
      page.focus(`input[name="${targetField}"]`)
      console.log('focus')
      // make sure old text is cleared out
      page.keyboard.down('Control');
      page.keyboard.press('A');
      page.keyboard.up('Control');
      page.keyboard.press('Backspace');
      page.keyboard.type(formatContent);
      console.log('type', formatContent)
    })
    .then(() => {
      return page.waitForSelector('#pstep_save-button')
        .then(() => {
          page.click('#pstep_save-button')
          console.log('save btn')
          return 'succesful'
        })
        .catch(() => 'There was an error')
    })
    .then(() => 'succesful')
    .catch(() => 'There was an error')

  await browser.close()
}



module.exports = Eventprops;
