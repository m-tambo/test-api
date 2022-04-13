require('dotenv').config({ path: process.env.ENV_PATH || '.env' });

const Koa = require('koa');
const routes = require('./router.js');
const app = new Koa();

app.use(routes.routes());

app.listen(process.env.PORT);
console.log(`Listening on port: ${process.env.PORT}`);
