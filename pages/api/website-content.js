const Login = require('server/methods/login');
const WebContent = require('server/methods/website-content');
import { setParams } from '../../lib/json'

export default ({ body, query }, res) => {
  const params = setParams(body ? body : query, 'em_event_website')

  return Promise.resolve()
    .then(() => Login(params))
    .then(({ auth, page, error }) => auth ?
        WebContent(params, page)
          .then(response => response.error ? Promise.reject(response) : response)
      :
        Promise.reject(error ? error : 'An unexpected error occured, please try again later')
    )
    .then(result => res.json({ data: { ...result }}))
    .catch(error => res.json({ data: { ...error }}))
}

