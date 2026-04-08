import type { User } from "../../@types/user";
import type { UserRepository } from "../types/user-repository";
import { v4 as uuidv4 } from "uuid";

export default class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  constructor() {}

  async create(user: Omit<User, "id" | "createdAt" | "updatedAt" | "checkIns">): Promise<User> {
    const newUser: User = {
      ...user,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(newUser);

    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    return user || null;
  }

}
