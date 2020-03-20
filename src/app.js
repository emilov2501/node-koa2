require('dotenv').config();

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import db from './db';

const app = new Koa();
app.use(bodyParser());

import router from './routes';

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