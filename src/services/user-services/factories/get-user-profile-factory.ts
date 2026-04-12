import type { UserRepository } from '../../../repositories/types/user-repository';
import GetUserProfileService from '../get-user-profile-service';

export function getUserProfileFactory(userRepository: UserRepository) {
  return new GetUserProfileService(userRepository);
}
