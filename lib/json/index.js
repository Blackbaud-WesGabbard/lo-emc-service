export const getDomain = env => {
  switch (env) {
    case 'dev':
      return 'https://secure2.convio.net/stjdev/site'
    case 'qa':
      return 'https://fundraising.qa.stjude.org/site'
    default:
      return 'https://fundraising.stjude.org/site'
  }
}

export const sendError = (message, params = {}) => ({
  status: 'fail',
  error: {
    message
  },
  ...params
})

export const sendSuccess = (params = {}) => ({
  status: 'success',
  ...params
})

export const setParams = (params, view) => ({
  ...params,
  domain: getDomain(params.env),
  url: `${getDomain(params.env)}/TREM?tr.emgmt=${view}&mfc_pref=T&fr_id=${params.frId}`
})
