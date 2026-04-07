import type { UserRepository } from "../../../repositories/types/user-repository";
import RegisterUserService from "../register-user-service";

export function registerUserFactory(userRepository: UserRepository) {
  return new RegisterUserService(userRepository);
}
