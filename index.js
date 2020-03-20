require('dotenv').config();

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const db = require('./src/db');

const app = new Koa();
app.use(bodyParser());
const router = require('./src/routes');

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