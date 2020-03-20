require('dotenv').config();

const Koa = require('koa');
const koaBody = require('koa-body');
const db = require('./src/db');
const app = new Koa();

app.use(koaBody());

const port = process.env.PORT || 3001
const host = process.env.HOST

// Connection DB
db('mongodb://localhost/noveo-node-training', (err) => {
  if (err) return console.log('MongoDB is not connect...');
  app.listen(port, () => console.log(`Listening http://${host}:${port}`));
});