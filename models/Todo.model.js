import { DataTypes } from "sequelize";
import sequelize from "../config/sqlite.js";

const Todos = sequelize.define(
  "todos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // status: {
    //   type: DataTypes.ENUM(),
    //   values: ["not started", "in progress", "completed"],
    //   defaultValue: "not started",
    // },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default Todos;
