const moment=require('moment')
const chatRecordModel=require('../models/chat')
async function addService(data){
  await chatRecordModel.insertMany(data)
}

// ! 获取一天内的数据
async function getChatService(){
  const result=await chatRecordModel.find({
    createAt:{
      $gte: moment().subtract(1,'day').toDate(),
      $lte:moment().toDate()
    }
  })
  return result
}

  
module.exports={
  addService,getChatService
}
