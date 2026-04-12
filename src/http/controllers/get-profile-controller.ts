import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import InMemoryUserRepository from '../../repositories/in-memory/user-repository-memory';
import { getUserProfileFactory } from '../../services/user-services/factories/get-user-profile-factory';

export default async function getProfileController(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    userId: z.string({
      message: 'Invalid user ID',
    }),
  });

  const { userId } = requestBodySchema.parse(request.params);

  try {
    const userRepository = new InMemoryUserRepository();
    const getUserProfileService = getUserProfileFactory(userRepository);
    const { user } = await getUserProfileService.execute(userId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = user;

    reply.send(userWithoutPassword);
  } catch (error) {
    return reply
      .status(400)
      .send({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
