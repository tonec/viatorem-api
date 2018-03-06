import omit from 'lodash.omit'

export default (type, data, req) => {
  let res = { meta: {}, data: [], links: {} }

  const raw = JSON.parse(JSON.stringify(data))

  res.meta.count = raw.length
  res.links.self = req.path()

  if (raw.length > 0) {
    res.data = raw.reduce((acc, item) => {
      let newItem = {
        type: type,
        id: item._id,
        attributes: {
          ...omit(item, ['_id', '__v'])
        }
      }

      return acc.concat(newItem)
    }, [])
  } else {
    res.data = null
  }

  return res
}
