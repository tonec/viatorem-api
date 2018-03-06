import config from '../../config'
import authController from '../controllers/authController'
import tripController from '../controllers/tripController'

const path = config.basePath

export default app => {
  app.get(path('/trips'), authController.loginRequired, tripController.query)
  app.get(path('/trips/:id'), authController.loginRequired, tripController.detail)
  app.post(path('/trips'), authController.loginRequired, tripController.insert)
  app.patch(path('/trips/'), authController.loginRequired, tripController.update)
  app.del(path('/trips/'), authController.loginRequired, tripController.delete)
}
