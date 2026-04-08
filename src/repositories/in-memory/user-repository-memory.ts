/* eslint-disable @typescript-eslint/naming-convention */
import type { User } from "../../@types/user";
import type { UserRepository } from "../types/user-repository";

export default class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  constructor() {}

  async create(user: User) {
    this.users.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);

    return user || null;
  }

}
