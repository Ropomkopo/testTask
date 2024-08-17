import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    allowNull: false,
    defaultValue: 'defaultValueName',
  })
  name: string;

  @Column({
    allowNull: false,
    defaultValue: 'defaultValue@gmail.com',
  })
  email: string;

  @Column({
    allowNull: false,
    defaultValue: '0987654345678',
  })
  phone: number;
}
