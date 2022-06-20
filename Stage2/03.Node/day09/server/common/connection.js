const { connect } = require('mongoose')
const config = require('../config')

// ? 连接数据库
function initConnection() {
  return new Promise((resolve, reject) => {
    connect(config.mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
        console.log('mongodb connection success')
      }
    })
  })
}
module.exports=initConnection