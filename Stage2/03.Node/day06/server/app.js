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
const cors = require('koa-cors');
const cookie = require('koa-cookie');
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
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())
router.use(cookie.default())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})

router.get('/', async (ctx, next) => {
  // ctx.body = 'Hello World'
  ctx.state = {
    title: 'Koa2'
  }
  await ctx.render('index', ctx.state)
})

// ? 判断页面是否有cookie且cookie是否为undefined
function jsonPare(val) {
  try {
    return JSON.parse(val);
  } catch (error) {
    return val;
  }
}

// ? 跳转到用户名界面
router.get('/userName', async (ctx) => {

  await ctx.render('nameRegist');
});
// ? 跳转到密码界面
router.get('/passwordPage', async (ctx) => {
  // !从cookie获取用户名
  // !如果没有,重新定向到name页面
  let form = ctx.cookies.get('formData');
  form = jsonPare(decodeURIComponent(form));
  if (form && form.username) {
    await ctx.render('passwordRegist');
  } else {
    ctx.redirect('/userName');
  }
  // console.log('form: ', form);
  // if (form) {
  //   form = JSON.parse(decodeURIComponent(form));
  //   if (form.username) {
  //     await ctx.render('passwordRegist');
  //   } else {
  //     ctx.redirect('/userName');
  //   }
  // } else {
  //   ctx.redirect('/userName');
  // }
});
// ? 跳转到个人信息界面
router.get('/informationPage', async (ctx) => {
  // ! 检查上一步是否完成
  // !如果没有,重新定向到password页面
  let form = ctx.cookies.get('formData');
  form = jsonPare(decodeURIComponent(form));
  if (form && form.password) {
    await ctx.render('userinfoRegist');

  } else {
    ctx.redirect('/passwordPage');
  }

});

// ? 跳转到登陆界面
router.get('/loginPage', async (ctx) => {

  await ctx.render('loginForm');

});

// ? 跳转到main页面
router.get('/successPage', async (ctx) => {
  let usr = ctx.cookies.get('user');
  let person = jsonPare(decodeURIComponent(usr)).name;
  console.log('usr: ', usr);
  let pas = ctx.cookies.get('pass');
  if (usr && pas) {
    await ctx.render('main', { person });
  } else {
    ctx.redirect('/loginPage');
  }

});

// ? 用户名重名检测
router.get('/checkNameDup', (ctx) => {
  const { name } = ctx.request.query;
  const nameArray = ['lucy', 'tomy', 'isen', 'lily'];
  ctx.response.body = nameArray.includes(name);
}
)

// ? 密码检测
router.get('/checkPasswordDup', (ctx) => {
  const { password_a, password_b } = ctx.request.query;
  ctx.response.body = (password_a === password_b);
}
)

// ? 用户信息非空检测
router.get('/checkInfo', (ctx) => {
  const { age, sex } = ctx.request.query;
  ctx.response.body = (age && sex);
}
)


// ? 登录信息检测
router.get('/checkLogin', (ctx) => {
  const { username, password } = ctx.request.query;
  ctx.response.body = (username === password);
  if (username === password) {
    ctx.cookies.set('user', encodeURIComponent(JSON.stringify({ name: username })),{maxAge:24*60*60*1000});
    ctx.cookies.set('pass', encodeURIComponent(JSON.stringify({ password: password })),{maxAge:24*60*60*1000})
  }
}
)



routes(router)
app.on('error', function (err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})




module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
