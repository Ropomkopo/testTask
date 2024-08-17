import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/user.model'; // Вказуємо шлях до моделі

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'rootpassword',
        database: 'nest_db',
        models: [User], // Підключаємо моделі
        dialectOptions: {
          connectTimeout: 60000,
          allowPublicKeyRetrieval: true,
        },
        logging: false, // Опціонально: вимкнути логування SQL-запитів
      });
      await sequelize.sync();
      return sequelize;
    },
  },
];
