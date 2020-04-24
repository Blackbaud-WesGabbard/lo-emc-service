const puppeteer = require('puppeteer')

const Eventprops = async ({ content, targetField }, page) => {
  console.log('enter props', page.url());

  return page.waitForSelector(`input[name="${targetField}"]`)
    .then(() => {
      page.focus(`input[name="${targetField}"]`)
      console.log('focus')
      // make sure old text is cleared out
      page.keyboard.down('Control');
      page.keyboard.press('A');
      page.keyboard.up('Control');
      page.keyboard.press('Backspace');
      page.keyboard.type(content);
      console.log('type')
    })
    .then(() => {
      return page.waitForSelector('#pstep_save-button')
        .then(() => {
          page.click('#pstep_save-button')
          console.log('save btn')
        })
    })
    .then(() => 'succesful')
    .catch(() => 'There was an error')

  await browser.close()
}

module.exports = Eventprops;
