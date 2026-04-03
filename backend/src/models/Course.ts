import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "courses" })
export class Course extends Model {
  @Column
  title!: string;

  @Column(DataType.TEXT)
  description!: string;

  @Column
  category!: string;

  @Column
  level!: string;

  @Column
  instructor!: string;

  @Column
  duration!: string;

  @Column({
    type: DataType.ENUM("Published", "Draft"),
    defaultValue: "Draft",
  })
  status!: "Published" | "Draft";

  @Column
  createdBy!: string;
}