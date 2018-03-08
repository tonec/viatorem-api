import omit from 'lodash.omit'

export default (type, data, req, res) => {
  let response = { status: 'ok', code: 200, meta: {} }

  const paginated = res.paginate.getPaginatedResponse(data)
  const parsed = JSON.parse(JSON.stringify(paginated))

  if (parsed.data.length > 0) {
    response[type] = parsed.data.reduce((acc, item) => {
      let newItem = {
        id: item._id,
        ...omit(item, ['_id', '__v'])
      }

      return acc.concat(newItem)
    }, [])
    response.pages = parsed.pages
    response.meta.total = data.length
  } else {
    response = null
  }

  return response
}
