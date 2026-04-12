import type { User } from '../../@types/user';
import type { UserRepository } from '../types/user-repository';
import { v4 as uuidv4 } from 'uuid';

export default class InMemoryUserRepository implements UserRepository {
  private users: User[] = [
    {
      id: "1",
      email: 'usertest@example.com',
      name: 'John Doe',
      passwordHash: '$2b$06$jvUIHg5O3c82Lxjbr72FV.lLbqiStua9KVy5GVb9.zeka96bwSLJW',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  constructor() {}

  async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'checkIns'>): Promise<User> {
    const newUser: User = {
      ...user,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);

    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    return user || null;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    return user || null;
  }
}
