import {
  Table, Column, Model, DataType, Default
} from "sequelize-typescript";

@Table({ tableName: "users" })
export class User extends Model {
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Default("admin")
  @Column(DataType.STRING)
  role!: "admin" | "superadmin";

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean;
}