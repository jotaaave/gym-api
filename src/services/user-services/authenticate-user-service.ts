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

    return {
      user,
    };
  }
}
