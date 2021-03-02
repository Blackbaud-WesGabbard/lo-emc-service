import { sendError, sendSuccess } from '../lib/json'

const WebContent = async ({ content, target }, page) => {
  const pageProps = {
    timeout: 2000,
    iframe: '#eventmgr_website_preview',
    edit: '.ManageLink .btn',
    disable: '#disable_wysiwyg_edit_fr_html_container',
    form: '#formedit_fr_html_container',
    textArea: '#edit_fr_html_containertext_area',
    submit: '#formedit_fr_html_container input[type="submit"]'
  }

  try {
    await page.waitForSelector(pageProps.iframe, { timeout: pageProps.timeout })
      .catch(() => {
        throw new Error('No iframe present, not able to find url to route request')
      })

    const iframeSrc = await page.$eval(pageProps.iframe, iframe => iframe.getAttribute('src'))

    await page.goto(iframeSrc).catch(() => {
      throw new Error('Not able to route request to correct url')
    })

    await page.waitForSelector(pageProps.edit, { timeout: pageProps.timeout })
     .then(() => page.click(pageProps.edit).catch(error => error))
     .catch(error => {
       console.log('no btn')
       throw new Error(error ? error.message : 'Not able to edit content')
     })

    await page.waitForSelector(pageProps.disable, { timeout: pageProps.timeout })
      .then(() =>
        page.click(pageProps.disable).catch(error => error)
      )
      .catch(error => {
        throw new Error(error ? error.message : 'Not able to use plain text editor')
      })

    await page.waitForSelector(pageProps.form, { timeout: pageProps.timeout })
      .catch(() => {
        throw new Error(error ? error.message : 'Form not ready to populate')
      })

    await page.waitForSelector(pageProps.textArea, { timeout: pageProps.timeout })
      .then(() =>
        page.$eval(pageProps.textArea, (el, val) => el.value = val, content).catch(error => error)
      )
      .catch(error => {
        throw new Error(error ? error.message : 'Not able to populate content')
      })

    await page.waitForSelector(pageProps.submit, { timeout: pageProps.timeout })
      .then(() =>
        page.click(pageProps.submit).catch(error => error)
      )
      .catch(error => {
        throw new Error(error ? error.message : 'Not able to submit request')
      })

    return sendSuccess({ content, target })

  } catch (error) {
    page.close()
    return sendError(error.message, { target, content })
  }
}

module.exports = WebContent;
