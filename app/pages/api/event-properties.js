const auth = require('server/methods/auth');
const Eventprops = require('server/methods/event-properties');

export default ({ query }, res) => {
  const nextUrl = `${query.domain}/TREM?tr.emgmt=em_edit_event_properties&mfc_pref=T&fr_id=${query.frId}`
  return Promise.resolve()
    .then(() => auth(query, nextUrl))
    .then(({ auth, page }) => {
      console.log(auth, 'auth')
      if (!auth) {
        throw Error('Auth failed, please try again')
      } else {
        console.log('we have auth')
        return Eventprops(query, page)
      }
    })
    .then(response =>
      res.json({
        data: result
      })
    )
    .catch(error =>
      res.json({
        error
      })
    )
}

