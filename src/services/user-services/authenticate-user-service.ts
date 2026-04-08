import { compare } from 'bcrypt';
import InvalidFormData from '../../errors/InvalidFormData';
import type { UserRepository } from '../../repositories/types/user-repository';

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

export default class AuthenticateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(data: AuthenticateUserRequest) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new InvalidFormData();
    }

    const isPasswordValid = await compare(data.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new InvalidFormData();
    }

    return {
      user,
    };
  }
}
