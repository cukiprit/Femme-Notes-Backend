import "dotenv/config";

import express from "express";
import sequelize from "./config/sqlite.js";

// import Tasks from "./models/Task.model.js";
// import Todos from "./models/Todo.model.js";
// import Users from "./models/User.model.js";

import {
  GetProfileUser,
  SignIn,
  SignUp,
  UpdateProfile,
} from "./controllers/Auth.controller.js";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "./controllers/Todo.controller.js";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "./controllers/Task.controller.js";
import {
  AuthenticateJWT,
  AuthenticateToken,
} from "./middleware/Auth.middleware.js";
import { seedData } from "./config/seed.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const name = process.env.NAME || "World";
  res.send(`Hello ${name}!`);
});

// Auth Routes
app.post("/sign-in", SignIn);
app.post("/sign-up", SignUp);
app.get("/user", AuthenticateJWT, GetProfileUser);
app.put("/user", AuthenticateJWT, UpdateProfile);
// Todo Routes
app.get("/todo", AuthenticateJWT, getAllTodos);
app.get("/todo/:id", AuthenticateJWT, getTodoById);
app.post("/todo", AuthenticateJWT, createTodo);
app.put("/todo/:id", AuthenticateJWT, updateTodo);
app.delete("/todo/:id", AuthenticateJWT, deleteTodo);
// Task Routes
app.get("/task", AuthenticateJWT, getAllTasks);
app.get("/task/:id", AuthenticateJWT, getTaskById);
app.post("/task", AuthenticateJWT, createTask);
app.put("/task/:id", AuthenticateJWT, updateTask);
app.delete("/task/:id", AuthenticateJWT, deleteTask);

const port = parseInt(process.env.PORT) || 3000;
sequelize.sync().then(() => {
  // seedData();
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
