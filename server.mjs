import express from "express";
import { engine } from "express-handlebars";
import { mongoose } from "mongoose";

import { usersRoutes } from "./src/routes/users.routes.mjs";
import { UsersController } from "./src/controllers/users.controller.mjs";
import { MongoUsersRepository } from "./src/repositories/users-mongo.repository.mjs";

import { pagesRoutes } from "./src/routes/pages.routes.mjs";
import { PagesController } from "./src/controllers/pages.controller.mjs";

const PORT = process.env.PORT || 4000;
const app = express();

const usersRepository = new MongoUsersRepository();
const usersController = new UsersController(usersRepository);
const pagesController = new PagesController(usersRepository);

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./src/views");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(express.static("src/assets"));

app.use("/api/users", usersRoutes(usersController));
app.use("/", pagesRoutes(pagesController));

mongoose.set("strictQuery", false);

mongoose.connect("mongodb://mongo:27017/mns", (error) => {
  if (error) throw error;
  console.info("Database successfully connected");
});

app.listen(PORT, () => {
  console.info("Server listening on port", PORT);
});
