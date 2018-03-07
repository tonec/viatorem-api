import omit from 'lodash.omit'

export default (type, data, req, res) => {
  let response = {status: 'ok', code: 200, result: {}}

  const paginated = res.paginate.getPaginatedResponse(data)
  const parsed = JSON.parse(JSON.stringify(paginated))

  console.log(parsed)

  if (parsed.data.length > 0) {
    response.result[type] = parsed.data.reduce((acc, item) => {
      let newItem = {
        id: item._id,
        ...omit(item, ['_id', '__v'])
      }

      return acc.concat(newItem)
    }, [])
    response.result.pages = parsed.pages
  } else {
    response.result = null
  }

  return response
}
