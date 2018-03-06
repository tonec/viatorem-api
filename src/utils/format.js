import omit from 'lodash.omit'

export default (type, data, req) => {
  let response = {status: 'ok', code: 200, result: {}}

  const raw = JSON.parse(JSON.stringify(data))

  if (raw.length > 0) {
    response.result[type] = raw.reduce((acc, item) => {
      let newItem = {
        id: item._id,
        ...omit(item, ['_id', '__v'])
      }

      return acc.concat(newItem)
    }, [])
  } else {
    response.result = null
  }

  return response
}
