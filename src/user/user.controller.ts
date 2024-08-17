import {
  Controller,
  Get,
  Post,
  // Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<User> {
    return this.userService.createUser(
      userData.name,
      userData.email,
      userData.phone,
    );
  }

  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOneUser(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  //   @Put(':id')
  //   async updateUser(
  //     @Param('id') id: number,
  //     @Body() userData: Partial<User>,
  //   ): Promise<User[]> {
  //     const [_, updatedUsers] = await this.userService.updateUser(id, userData);
  //     return updatedUsers;
  //   }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
