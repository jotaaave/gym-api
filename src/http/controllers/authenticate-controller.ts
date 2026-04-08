import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import InMemoryUserRepository from '../../repositories/in-memory/user-repository-memory';
import { authenticateUserFactory } from '../../services/user-services/factories/authenticate-user-factory';

export default async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    email: z.email({
      message: 'Invalid email address',
    }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(100, { message: 'Password must be at most 100 characters' }),
  });

  const { email, password } = requestBodySchema.parse(request.body);

  try {
    const userRepository = new InMemoryUserRepository();
    const authenticateUserService = authenticateUserFactory(userRepository);
    const { user } = await authenticateUserService.execute({ email, password });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = user;

    reply.send({
      token: 'fake-jwt-token',
    });
  } catch (error) {
    return reply.status(400).send({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
