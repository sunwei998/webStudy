const userModel=require('../models/users')

// ? 进入登录界面
async function login (ctx) {
  await ctx.render('login')
}

// ? 验证用户名密码并设置cookie
async function checkLogin (ctx) {
  const { name, password } = ctx.request.query
  const yyt = await userModel. findOne({ name , password })
  ctx.response.body = yyt
  if (yyt) {
    ctx.cookies.set('user', encodeURIComponent(JSON.stringify({ name: name })), { maxAge: 3 * 60 * 1000 })
    ctx.cookies.set('pass', encodeURIComponent(JSON.stringify({ password: password })), { maxAge: 3 * 60 * 1000 })
  }
}
  
module.exports={
  login,checkLogin
}