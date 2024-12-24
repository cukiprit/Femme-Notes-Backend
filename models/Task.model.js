import { DataTypes } from "sequelize";
import sequelize from "../config/sqlite.js";

const Tasks = sequelize.define(
  "tasks",
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
    note: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    start_task: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_task: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  { freezeTableName: true }
);

export default Tasks;
