import fastify from 'fastify';
import z, { ZodError } from 'zod';
import { ENV } from './env/env';

const app = fastify();

app.register(import('./http/routes/routes'));

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: z.treeifyError(error),
    });
  }

  if (ENV.NODE_ENV !== 'production') {
    console.error(error);
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});

export default app;
