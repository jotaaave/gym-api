import InvalidFormData from "../../errors/InvalidFormData";
import type { UserRepository } from "../../repositories/types/user-repository";

export default class GetUserProfileService {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new InvalidFormData
    }

    return {
      user,
    };
  }
}
