require('dotenv').config();

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import morgan from 'koa-morgan';
import cors from '@koa/cors';
import router from './routes';
import config from 'config';

const app = new Koa();

const JWT_PRIVATE_KEY = config.get('JWT_PRIVATE_KEY');

if (!JWT_PRIVATE_KEY) {
  console.log('FATAL ERROR: JWT_PRIVATE_KEY is not defined.');
  process.exit();
}

function registerGlobalModules () {
  app.use(cors());
  app.use(bodyParser());
  app.use(morgan('dev'));
}

function registerRouter() {
  app
    .use(router.routes())
    .use(router.allowedMethods());
}

export function initApp() {
  
  registerGlobalModules();
  registerRouter();

  return {
    app
  }
}
