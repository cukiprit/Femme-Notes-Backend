import Tasks from "../models/Task.model.js";
import jwt from "jsonwebtoken";

export const getAllTasks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const { count, rows } = await Tasks.findAndCountAll({
    where: {
      userId: req.user.id,
    },
    limit,
    offset,
    order: [["createdAt", "ASC"]],
  });
  const total = Math.ceil(count / limit);

  return res.status(200).json({
    tasks: rows,
    currentPage: page,
    totalPages: total,
  });
};

export const getTaskById = async (req, res) => {
  const data = await Tasks.findByPk(req.params.id);

  if (!data) {
    return res
      .status(404)
      .json({ message: "Error", errors: "Task is not found" });
  }

  return res.status(200).json({
    task: data,
  });
};

export const createTask = async (req, res) => {
  const { title, note, date, start_task, end_task } = req.body;

  const data = await Tasks.create({ title, note, date, start_task, end_task });

  return res.status(201).json({ message: "Success", data });
};

export const updateTask = async (req, res) => {
  const { title, note, date, start_task, end_task } = req.body;
  const id = req.params.id;
  const task = await Tasks.findByPk(id);

  if (!task) {
    return res
      .status(404)
      .json({ message: "Error", errors: "Task is not found" });
  }

  const data = await task.update({ title, note, date, start_task, end_task });

  return res.status(201).json({ message: "Success", data });
};

export const deleteTask = async (req, res) => {
  const id = req.params.id;
  const task = await Tasks.findByPk(id);

  if (!task) {
    return res
      .status(404)
      .json({ message: "Error", errors: "Task is not found" });
  }

  await task.destroy();

  return res.status(200).json({ message: "Success" });
};
