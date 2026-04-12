import { beforeEach, describe, expect, it } from 'vitest';
import InMemoryUserRepository from '../../../repositories/in-memory/user-repository-memory';
import type { UserRepository } from '../../../repositories/types/user-repository';
import type GetUserProfileService from '../get-user-profile-service';
import { getUserProfileFactory } from '../factories/get-user-profile-factory';
import { registerUserFactory } from '../factories/register-user-factory';
import type RegisterUserService from '../register-user-service';
import InvalidFormData from '../../../errors/InvalidFormData';

let usr: UserRepository;
let sut: GetUserProfileService;
let registerUserService: RegisterUserService;

describe('Get User Profile Service', () => {
  beforeEach(() => {
    usr = new InMemoryUserRepository();
    sut = getUserProfileFactory(usr);
    registerUserService = registerUserFactory(usr);
  });

  it('should be able to get a user profile', async () => {
    const fakeUser = {
      name: 'João',
      email: 'test@example.com',
      passwordHash: 'password123',
    };

    const { user } = await registerUserService.execute(fakeUser);

    const { user: profile } = await sut.execute(user.id as string);

    expect(profile).toBeTruthy();
    expect(profile.email).toBe(fakeUser.email);
  });

  it('should not be able to get incorrect user profile', async () => {
    const userId = 'non-existent-id';

    await expect(async () => await sut.execute(userId)).rejects.toBeInstanceOf(InvalidFormData);
  });
});
