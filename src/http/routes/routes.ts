import type { FastifyInstance } from 'fastify';
import registerController from '../controllers/register-controller';
import authenticateController from '../controllers/authenticate-controller';

export default function appRoutes(app: FastifyInstance) {
  app.post('/register', registerController)

  app.post('/authenticate', authenticateController)
}
