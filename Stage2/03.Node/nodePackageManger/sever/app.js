const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')

const config = require('./config')
const routes = require('./routes')

const port = process.env.PORT || config.port

// error handler
onerror(app)

// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: { settings: { views: path.join(__dirname, 'views') } },
    map: { 'njk': 'nunjucks' },
    extension: 'njk'
  }))
  .use(router.routes())
  .use(router.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})

// router.get('/', async (ctx, next) => {
//   // ctx.body = 'Hello World'
//   ctx.state = {
//     title: 'Koa2'
//   }
//   await ctx.render('index', ctx.state)
// })

router.get('/enroll', (ctx) => {
  const { username, password_a, password_b } = ctx.request.query;
  let flag_1 = false;
  let flag_2 = false;
  let flag_3 = false;
  const len_1 = username;
  const uPattern_a = /^[a-zA-Z0-9_-]{4,16}$/
  flag_1 = uPattern_a.test(len_1);
  console.log('flag_1: ', flag_1);
  const len_2 = password_a;
  const uPattern_b = /^[a-zA-Z0-9_]{8,15}$/
  flag_2 = uPattern_b.test(len_2);
  console.log('flag_2: ', flag_2);
  const len_3 = password_b;
  flag_3 = len_3 === len_2 ? true : false;
  console.log('flag_3: ', flag_3);
  let feedBack='';
  if (!flag_1) {
    feedBack+='错误原因:\n用户名不符合要求';
  }
  if (!flag_2) {
    if(!feedBack){
      feedBack+='错误原因:\n密码输入格式错误';
    }else{
      feedBack+='\n密码输入格式错误'
    }
  }
  if (!flag_3) {
    if(!feedBack){
      feedBack+='错误原因:\n密码输入不一致';
    }else{
      feedBack+='\n密码输入不一致'
    }
  }
  if (flag_1 && flag_2 && flag_3) {
    feedBack+='注册成功';
  }
  ctx.response.body=feedBack;
})


routes(router)
app.on('error', function (err, ctx) {
  console.log(err);
  logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
