// ? 判断页面是否有cookie且cookie是否为undefined
function jsonPare(val) {
  try {
    return JSON.parse(val)
  } catch (error) {
    return val
  }
}
module.exports={
  jsonPare
}