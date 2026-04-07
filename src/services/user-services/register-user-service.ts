import type User from "../../@types/user";
import UserAlreadyExists from "../../errors/UserAlreadyExists";
import type { UserRepository } from "../../repositories/types/user-repository";

export default class RegisterUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(data: User) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new UserAlreadyExists;
    }

    const user = await this.userRepository.create(data);

    return {
      user,
    }
  }
}
