require('dotenv').config();

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import morgan from 'koa-morgan';
import db from './db';
import router from './routes';
import config from 'config';

const JWT_PRIVATE_KEY = config.get('JWT_PRIVATE_KEY');

if (!JWT_PRIVATE_KEY) {
  console.log('FATAL ERROR: JWT_PRIVATE_KEY is not defined.');
  process.exit();
}

const app = new Koa();

app.use(bodyParser());
app.use(morgan('dev'));

app
  .use(router.routes())
  .use(router.allowedMethods());



const port = process.env.PORT || 3001
const host = process.env.HOST

// Connection DB
db.connect(process.env.DB_PATH, (err) => {
  if (err) return console.log('MongoDB is not connect...');
  app.listen(port, () => console.log(`Listening http://${host}:${port}`));
});