import type { User } from "../../@types/user";
import UserAlreadyExists from "../../errors/UserAlreadyExists";
import type { UserRepository } from "../../repositories/types/user-repository";
import { hash } from "crypto";

export default class RegisterUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(data: User) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new UserAlreadyExists;
    }

    const passwordHash = await hash('sha256', data.passwordHash);

    const user = await this.userRepository.create({ ...data, passwordHash });

    return {
      user
    }
  }
}
