import {
  Table, Column, Model, DataType, Default
} from "sequelize-typescript";

@Table({ tableName: "users" })
export class User extends Model {

  @Column
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column
  password!: string;

  @Default("admin")
  @Column
  role!: "admin" | "superadmin";

  @Default(true)
  @Column
  isActive!: boolean;

  @Default(true)
  @Column
  mustResetPassword!: boolean;

  @Column(DataType.STRING)
  otp!: string;

  @Column(DataType.DATE)
  otpExpiry!: Date;

}