require('dotenv').config();

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import morgan from 'koa-morgan';
import db from './db';
import router from './routes';

const app = new Koa();

app.use(bodyParser());
app.use(morgan('dev'));

app
  .use(router.routes())
  .use(router.allowedMethods());



const port = process.env.PORT || 3001
const host = process.env.HOST

// Connection DB
db(process.env.DB_PATH, (err) => {
  if (err) return console.log('MongoDB is not connect...');
  app.listen(port, () => console.log(`Listening http://${host}:${port}`));
});