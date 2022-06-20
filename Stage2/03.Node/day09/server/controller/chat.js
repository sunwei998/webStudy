const helloW=require('../common/cookieFind')

async function chatCheck(ctx) {
  let usr = ctx.cookies.get('user')
  let person = helloW.jsonPare(decodeURIComponent(usr)).name
  let pas = ctx.cookies.get('pass')
  if (usr && pas) {
    await ctx.render('chat', { person })
  } else {
    ctx.redirect('/login')
  }
}


module.exports = { chatCheck }