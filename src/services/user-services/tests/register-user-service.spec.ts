import { beforeEach, describe, expect, it } from 'vitest';
import { registerUserFactory } from '../factories/register-user-factory';
import type RegisterUserService from '../register-user-service';
import InMemoryUserRepository from '../../../repositories/in-memory/user-repository-memory';
import UserAlreadyExists from '../../../errors/UserAlreadyExists';
import type { UserRepository } from '../../../repositories/types/user-repository';

let usr: UserRepository;
let sut: RegisterUserService;

describe('Register User Service', () => {
  beforeEach(() => {
    usr = new InMemoryUserRepository();
    sut = registerUserFactory(usr);
  });

  it('should be able to register a user successfully', async () => {
    const fakeUser = {
      email: 'test@example.com',
      password: 'password123',
    };

    const { user } = await sut.execute(fakeUser);

    expect(user.email).toBe(fakeUser.email);
  });

  it('should not be able to register a user with an existing email', async () => {
    const fakeUser = {
      email: 'test@example.com',
      password: 'password123',
    };

    await sut.execute(fakeUser);

    await expect(async () => await sut.execute(fakeUser)).rejects.toBeInstanceOf(UserAlreadyExists);
  });
});
