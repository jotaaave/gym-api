import { describe, it, expect, beforeEach } from 'vitest';
import InMemoryUserRepository from '../../../repositories/in-memory/user-repository-memory';
import type { UserRepository } from '../../../repositories/types/user-repository';
import type AuthenticateUserService from '../authenticate-user-service';
import { authenticateUserFactory } from '../factories/authenticate-user-factory';
import type RegisterUserService from '../register-user-service';
import { registerUserFactory } from '../factories/register-user-factory';

let usr: UserRepository;
let sut: AuthenticateUserService;
let registerUserService: RegisterUserService;

describe('Authenticate User Service', () => {
  beforeEach(() => {
    usr = new InMemoryUserRepository();
    sut = authenticateUserFactory(usr);
    registerUserService = registerUserFactory(usr);
  });

  it('should be able to authenticate a user', async () => {
    const fakeUser = {
      email: 'test@example.com',
      password: 'password123',
    };

    await registerUserService.execute({
      name: 'Test User',
      email: 'test@example.com',
      passwordHash: 'password123',
    });

    const { user } = await sut.execute(fakeUser);

    expect(user.email).toBe(fakeUser.email);
  });
});
