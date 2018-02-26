import User from '../models/userModel'
import verifyToken from '../utils/verifyToken'

export default {
  index: (req, res, next) => {
    User.find({})
      .then(users => {
        res.json(users)
      })
      .catch(next)
  },

  show: (req, res, next) => {
    const _id = req.params.id

    User.findById({ _id })
      .then(user => {
        res.json(user)
      })
      .catch(next)
  },

  current: (req, res, next) => {
    const { viatorem } = req.cookies
    const cookie = viatorem ? JSON.parse(viatorem) : null

    if (cookie && cookie.accessToken) {
      const verified = verifyToken(cookie.accessToken)
      if (verified) {
        res.send(verified)
        return
      }
    }

    res.send(null)
  }
}
