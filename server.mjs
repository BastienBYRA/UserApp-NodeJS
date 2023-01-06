import express from 'express';
import { engine } from 'express-handlebars';
import { mongoose } from 'mongoose';

import { usersRoutes } from './routes/users.routes.mjs';
import { UsersController } from './controllers/users.controller.mjs';
// import { UsersRepository } from './repositories/users.repository.mjs';
import { MongoUsersRepository } from './repositories/users-mongo.repository.mjs';

import { pagesRoutes } from './routes/pages.routes.mjs';
import { PagesController } from './controllers/pages.controller.mjs';

const PORT = process.env.PORT || 4000;
const app = express();

const usersRepository = new MongoUsersRepository();
const usersController = new UsersController(usersRepository);
const pagesController = new PagesController(usersRepository);

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());
app.use(express.static('assets'));

app.use('/api/users', usersRoutes(usersController));
app.use('/', pagesRoutes(pagesController));

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost:27017/mns', (error) => {
  if (error) throw error;
  console.info('Database successfully connected');
});

app.listen(PORT, () => {
  console.info('Server listening on port', PORT);
});
