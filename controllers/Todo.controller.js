import "dotenv/config";
import Todos from "../models/Todo.model.js";

export const getAllTodos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const { count, rows } = await Todos.findAndCountAll({
    where: {
      userId: req.user.id,
    },
    limit,
    offset,
    order: [["createdAt", "ASC"]],
  });
  const total = Math.ceil(count / limit);

  return res.status(200).json({
    todos: rows,
    currentPage: page,
    totalPages: total,
  });
};

export const getTodoById = async (req, res) => {
  const data = await Todos.findByPk(req.params.id);

  if (!data) {
    return res
      .status(404)
      .json({ message: "Error", errors: "Todo is not found" });
  }

  return res.status(200).json({
    todo: data,
  });
};

export const createTodo = async (req, res) => {
  const { title, content } = req.body;

  const data = await Todos.create({ title, content, userId: req.user.id });

  return res.status(201).json({ message: "Success", data });
};

export const updateTodo = async (req, res) => {
  const { title, content } = req.body;
  const id = req.params.id;
  const todo = await Todos.findByPk(id);

  if (!todo) {
    return res
      .status(404)
      .json({ message: "Error", errors: "Todo is not found" });
  }

  const data = await todo.update({ title, content, userId: req.user.id });

  return res.status(201).json({ message: "Success", data });
};

export const deleteTodo = async (req, res) => {
  const id = req.params.id;
  const todo = await Todos.findByPk(id);

  if (!todo) {
    return res
      .status(404)
      .json({ message: "Error", errors: "Todo is not found" });
  }

  await todo.destroy();

  return res.status(200).json({ message: "Success" });
};
