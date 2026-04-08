import type { UserRepository } from '../../../repositories/types/user-repository';
import AuthenticateUserService from '../authenticate-user-service';

export function authenticateUserFactory(userRepository: UserRepository) {
  return new AuthenticateUserService(userRepository);
}
