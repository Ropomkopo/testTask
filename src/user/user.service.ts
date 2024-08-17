import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { User } from './user.model';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
    private readonly jwtService: JwtService,
  ) {}

  // Отримати всіх користувачів
  async getAllUsers(): Promise<User[]> {
    return this.sequelize.getRepository(User).findAll();
  }

  // Створити користувача
  async createUser(
    name: string,
    email: string,
    phone: number,
  ): Promise<{ access_token: string }> {
    const payload = await this.sequelize
      .getRepository(User)
      .create({ name, email, phone });
    return {
      access_token: jwt.sign(payload.dataValues, 'yourSecretKey', {
        expiresIn: 3600000,
      }),
    };
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.sequelize.getRepository(User).findByPk(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
