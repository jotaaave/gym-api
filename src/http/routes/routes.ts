import type { FastifyInstance } from 'fastify';
import registerController from '../controllers/register-controller';
import authenticateController from '../controllers/authenticate-controller';
import getProfileController from '../controllers/get-profile-controller';

export default function appRoutes(app: FastifyInstance) {
  app.post('/register', registerController)

  app.post('/authenticate', authenticateController)

  app.post('/profile/:userId', getProfileController)
}
