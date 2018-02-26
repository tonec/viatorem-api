import errors from 'restify-errors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt-nodejs'
import User from '../models/userModel'

export default {
  register: (req, res) => {
    const { body } = req

    const userProps = {
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, bcrypt.genSaltSync(10))
    }

    if (!body.name || !body.email || !body.password) {
      res.send(
        new errors.BadRequestError('Incomplete registration information.')
      )
      return
    }

    User.create(userProps)
      .then(user => {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          message: 'New user registered successfully.'
        })
      })
      .catch(err => {
        res.send(
          new errors.BadRequestError({
            message: err.message
          })
        )
      })
  },

  login: (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          res.send(
            new errors.UnauthorizedError({
              message: 'Authentication failed. User not found.'
            })
          )
        }

        if (!user.comparePasswords(req.body.password)) {
          res.send(
            new errors.UnauthorizedError({
              message:
                'Authentication failed. The password entered does not match our records.'
            })
          )
        }

        res.json({
          accessToken: jwt.sign(
            {
              name: user.name,
              email: user.email,
              _id: user._id
            },
            'some secret'
          ),
          expires: 1
        })
      })
      .catch(next)
  },

  loginRequired: (req, res, next) => {
    if (req.user) {
      next()
    } else {
      return res.send(
        new errors.UnauthorizedError({
          message: 'Unauthorised user.'
        })
      )
    }
  }
}
