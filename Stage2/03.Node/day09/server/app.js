const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const moment=require('moment')

const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')
const cookie=require('koa-cookie')

// ? 在node环境中,引入一个文件夹就是引入这个文件夹中的index.js文件
// ? 配置
const config = require('./config')

// ? 路由入口
const routes = require('./routes')

// ? 自定义过滤器
const nunjucksEnv = require('nunjucks')

// * 自定义过滤器
nunjucksEnv.configure(path.join(__dirname, '/views'),{

  trimBlocks: true,
  lstripBlocks: true
}).addFilter('formatTime',(v)=>{

  return moment(v).locale('zh_cn').format('YYYYMMMMDo  aHH:mm:ss')
})

const port = process.env.PORT || config.port

// error handler
onerror(app)

router.use(cookie.default())
// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: nunjucksEnv,
    map: {'njk': 'nunjucks'},
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



// ? 连接数据库
const initConnection=require('./common/connection')
initConnection()


routes(router)
app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
