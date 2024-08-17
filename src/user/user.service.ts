import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createUser(name: string, email: string, phone: number): Promise<User> {
    console.log('phone =>', phone);
    return this.userModel.create({ name, email, phone });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async updateUser(id: number, data: Partial<User>): Promise<[number, User[]]> {
    return this.userModel.update(data, {
      where: { id },
      returning: true,
    });
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
