import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table
export class User extends Model {
  @Column
  name!: string;

  @Column
  email!: string;

  @Column
  password!: string;

  @Column
  role!: "admin" | "superadmin";

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive!: boolean; 
}