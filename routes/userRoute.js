import config from '../config'
import authController from '../controllers/authController'
import userController from '../controllers/userController'

const path = config.basePath

export default app => {
  app.get(path('/users'), authController.loginRequired, userController.index)
  app.get(path('/users/:id'), authController.loginRequired, userController.show)
}
