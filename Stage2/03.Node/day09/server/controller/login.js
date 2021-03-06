const userModel=require('../models/users')
const loginService=require('../services/login')

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
    // * 获取一个随机头像并放入cookie
    const avatar=loginService.getRandomAvatar()
    // console.log('avatar: ', avatar)
    // * 设置cookie,过期时间为1小时
    ctx.cookies.set('ava', encodeURIComponent(JSON.stringify({ avatar: avatar })), { maxAge: 60 * 60 * 1000 })
    ctx.cookies.set('user', encodeURIComponent(JSON.stringify({ name: name })), { maxAge: 60 * 60 * 1000 })
    ctx.cookies.set('pass', encodeURIComponent(JSON.stringify({ password: password })), { maxAge: 60 * 60 * 1000 })
  }
}
  
module.exports={
  login,checkLogin
}