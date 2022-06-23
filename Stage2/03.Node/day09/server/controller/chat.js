const helloW = require('../common/cookieFind')
const addChatService = require('../services/chat')
// ! 检查cookie是否存在,并从cookie中取出头像url和用户名
async function chatCheck(ctx) {
  let usr = ctx.cookies.get('user')
  let pas = ctx.cookies.get('pass')
  let avaUrl = ctx.cookies.get('ava')
  if (usr && pas) {
    let person = helloW.jsonPare(decodeURIComponent(usr)).name
    let avatarUrl = helloW.jsonPare(decodeURIComponent(avaUrl)).avatar
    
    // todo 获取最新聊天记录并渲染进模版引擎
    let content=await addChatService.getChatService()
    // console.log('content: ', content)
    await ctx.render('chat', { person, avatarUrl, content })
  } else {
    // ! 如果用户没有登录,重新定向到login页面
    ctx.redirect('/login')
  }
}

// ! 添加聊天记录
async function addContent(ctx) {
  const { content } = ctx.request.body
  // console.log('content: ', content)
  let usr = ctx.cookies.get('user')
  let name = helloW.jsonPare(decodeURIComponent(usr)).name
  let avaUrl = ctx.cookies.get('ava')
  let avatarUrl = helloW.jsonPare(decodeURIComponent(avaUrl)).avatar

  // ? 调用服务,将聊天记录放入数据库
  await addChatService.addService({
    name, avatarUrl, content
  })
  // ? 获取最新的聊天记录,返回给前端
  const data=await addChatService.getChatService()
  ctx.response.body = {
    status: true,
    data:data
  }
}

async function pageRefresh(ctx){
  const data=await addChatService.getChatService()
  ctx.response.body = {
    status: true,
    data:data
  }
}




module.exports = { chatCheck, addContent, pageRefresh  }