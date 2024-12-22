import request from "supertest";
import express from "express";
import { expect } from "chai";
import sinon from "sinon";

import { AuthenticateJWT } from "../middleware/Auth.middleware.js";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "../controllers/Todo.controller.js";

const app = express();
app.use(express.json());

app.get("/todo", AuthenticateJWT, getAllTodos);
app.post("/todo", AuthenticateJWT, createTodo);

describe("Todo Routes", () => {
  let createTodoSub;
  let getAllTodosSub;

  beforeEach(() => {
    createTodoSub = sinon
      .stub()
      .callsFake((req, res) => res.status(201).send("Todo created"));
    getAllTodosSub = sinon
      .stub()
      .callsFake((req, res) => res.status(200).send("Todos list"));

    createTodo = createTodoSub;
    getAllTodos = getAllTodosSub;
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should protect todo routes and return 401 if no token provided", async () => {
    const response = await request(app).get("/todo");
    expect(response.status).to.equal(401);
    expect(response.text).to.equal("Unauthorized");
  });
});
