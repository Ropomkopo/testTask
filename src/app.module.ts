import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { User } from './user/user.model';
import { UserService } from './user/user.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql', // або 'postgres', 'sqlite', 'mariadb'
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rootpassword',
      database: 'nest_db',
      models: [User],
      autoLoadModels: true,
      synchronize: true,
      dialectOptions: {
        // Додавання цього параметра вирішує проблему
        allowPublicKeyRetrieval: true,
      },
      logging: console.log,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }),
    UserModule,
    SequelizeModule.forFeature([User]),
  ],
  providers: [UserService],
})
export class AppModule {}
