import User from '../models/userModel'

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
  }
}
