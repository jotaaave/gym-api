import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { registerUserFactory } from '../../services/user-services/factories/register-user-factory';
import InMemoryUserRepository from '../../repositories/in-memory/user-repository-memory';

export default async function registerController(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    email: z.email({
      message: 'Invalid email address',
    }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(100, { message: 'Password must be at most 100 characters' }),
    name: z.string().min(1, { message: 'Name is required' }),
  });

  const { email, password, name } = requestBodySchema.parse(request.body);

  try {
    const userRepository = new InMemoryUserRepository();
    const registerUserService = registerUserFactory(userRepository);
    const { user } = await registerUserService.execute({ email, passwordHash: password, name });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = user;

    reply.send({
      message: 'User registered successfully',
      user: userWithoutPassword
    });
  } catch (error) {
    return reply.status(400).send({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
