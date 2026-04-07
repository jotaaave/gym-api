import type { FastifyInstance } from 'fastify';
import registerController from '../controllers/register-controller';

export default function appRoutes(app: FastifyInstance) {
  app.post('/register', registerController)
}
