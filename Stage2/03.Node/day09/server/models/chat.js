const { Schema, model } = require('mongoose')
const chatRecordSchema = new Schema({
  name: String,
  avatarUrl: String,
  content: String,
  createAt:{
    type:Date,
    // ! 类型检查默认值
    default:Date.now
  }
})
const chatRecordModel = model('chatRecords', chatRecordSchema)
module.exports=chatRecordModel