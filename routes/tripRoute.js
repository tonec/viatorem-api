import config from '../config'
import authController from '../controllers/authController'
import tripController from '../controllers/tripController'

const path = config.basePath

export default app => {
  app.get(path('/trips'), authController.loginRequired, tripController.index)
  app.get(path('/trips/:id'), authController.loginRequired, tripController.show)
  app.post(path('/trips'), authController.loginRequired, tripController.create)
  // app.patch(pathApi('/trips/'), tripController.update)
  // app.delete(pathApi('/trips/'), tripController.delete)
}
