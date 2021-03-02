const Auth = require('server/methods/auth');
const Eventprops = require('server/methods/event-properties');
import { setParams } from '../../lib/json'

export default ({ body, query }, res) => {
  const params = setParams(body ? body : query, 'em_edit_event_properties')

  return Promise.resolve()
    .then(() => Auth(params))
    .then(({ auth, page, error }) => auth ?
        Eventprops(params, page)
          .then(response => response.error ? Promise.reject(response) : response)
      :
        Promise.reject(error ? error : 'An unexpected error occured, please try again later')
    )
    .then(result => res.json({ data: { ...result }}))
    .catch(error => res.json({ data: { ...error }}))
}

