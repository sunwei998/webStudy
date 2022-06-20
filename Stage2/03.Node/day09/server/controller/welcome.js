async function main(ctx)  {
  ctx.state = {
    title: 'Koa2'
  }
  await ctx.render('index', ctx.state)
}

module.exports={
  main
}