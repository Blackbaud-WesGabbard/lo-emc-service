const getTitle = require('server/methods/basic/getTitle');

export default ({ query }, res) => {
  return Promise.resolve()
    .then(() => getTitle(query.url))
    .then(result =>
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

