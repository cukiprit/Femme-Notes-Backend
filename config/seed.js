import { faker } from "@faker-js/faker";

import bcrypt from "bcrypt";

import Users from "../models/User.model.js";
import Todos from "../models/Todo.model.js";
import Tasks from "../models/Task.model.js";

export const seedData = async () => {
  const hashedPass1 = await bcrypt.hash("Admin-123", 10);
  const hashedPass2 = await bcrypt.hash("Admin-321", 10);

  await Users.bulkCreate([
    { name: "Admin1", email: "admin1@example.com", password: hashedPass1 },
    { name: "Admin2", email: "admin2@example.com", password: hashedPass2 },
  ]);

  const todos = [];
  for (let i = 0; i < 1000; i++) {
    todos.push({
      title: faker.lorem.sentence(5),
      content: faker.lorem.paragraph({ min: 1, max: 3 }),
      userId: faker.number.int({ min: 1, max: 2 }),
    });
  }
  await Todos.bulkCreate(todos);

  const tasks = [];
  for (let i = 0; i < 1000; i++) {
    tasks.push({
      title: faker.lorem.sentence(5),
      note: faker.lorem.paragraph({ min: 1, max: 3 }),
      date: faker.date.past(),
      start_task: faker.date.past(),
      end_task: faker.date.future(),
      userId: faker.number.int({ min: 1, max: 2 }),
    });
  }
  await Tasks.bulkCreate(tasks);
};
