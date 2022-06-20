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

router.get('/', async (ctx, next) => {
  // ctx.body = 'Hello World'
  ctx.state = {
    title: 'Koa2'
  }
  await ctx.render('index', ctx.state)
})

const { Schema, model, connect } = require('mongoose');

// ? 连接数据库
function initConnection() {
  return new Promise((resolve, reject) => {
    connect('mongodb://localhost/cr777', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
        console.log('mongodb connection success');
      }
    });
  })
}
initConnection();

const userSchema = new Schema({
  name: String,
  password: String,
  age: Number,
  sex: Number
})
const userModel = model('users', userSchema);

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
  let male= await userModel.find({ sex:1 });
  console.log('male: ', typeof male);
  console.log('helloArray',male[0]);
  let female= await userModel.find({ sex:0 })
  let usr = ctx.cookies.get('user');
  let person = jsonPare(decodeURIComponent(usr)).name;
  console.log('usr: ', usr);
  let pas = ctx.cookies.get('pass');
  if (usr && pas) {
    await ctx.render('main', { person,male,female});
  } else {
    ctx.redirect('/loginPage');
  }

});

// ? 用户名重名检测
router.get('/checkNameDup', async (ctx) => {
  const { name } = ctx.request.query;
  const usr = await userModel.findOne({ name })
  console.log('usr: ', usr);
  ctx.response.body = usr;
}
)

// ? 密码检测
router.get('/checkPasswordDup', (ctx) => {
  const { password_a, password_b } = ctx.request.query;
  ctx.response.body = (password_a === password_b);
}
)

// ? 用户信息非空检测
router.get('/checkInfo', async(ctx) => {
  const { age, sex } = ctx.request.query;
  if (age && sex) {
    console.log('hello');
    let form = ctx.cookies.get('formData');
    let name = jsonPare(decodeURIComponent(form)).username;
    console.log('name: ',typeof name);
    // let password = ctx.cookies.get('formData').password;
    let password = jsonPare(decodeURIComponent(form)).password;
    console.log('password: ', typeof password);
    let age = jsonPare(decodeURIComponent(form)).age;
    console.log('age: ', typeof age);
    let sex = jsonPare(decodeURIComponent(form)).sex;
    console.log('sex: ', typeof sex);

   await userModel.insertMany ({ name, password,age,sex})
  }
  ctx.response.body = (age && sex);
}
)


// ? 登录信息检测
router.get('/checkLogin', async(ctx) => {
  const { name, password } = ctx.request.query;
  const yyt = await userModel. findOne({ name , password });
  ctx.response.body = yyt;
  if (yyt) {
    ctx.cookies.set('user', encodeURIComponent(JSON.stringify({ name: name })), { maxAge: 3 * 60 * 1000 });
    ctx.cookies.set('pass', encodeURIComponent(JSON.stringify({ password: password })), { maxAge: 3 * 60 * 1000 })
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
