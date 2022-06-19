const { Schema, model, connect } = require('mongoose');

// ? 连接数据库
// function initConnection() {
//     mongoose.connect('mongodb://localhost/', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }, (error) => {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('mongodb connection success');
//         }
//     });
// }


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
                //  console.log('mongodb connection success');
            }
        });
    })
}
initConnection().then(async () => {
    console.log('你离开了南京,从此没人和我说话');
    // ? orm js中的对象和数据库中的表的映射

    // ? Schema 模式  字段类型映射
    // const { Schema } = mongoose;
    const studentSchema = new Schema({
        name: String,
        age: Number,
        sex: Number
    })
    // ? model(表名,类型映射)
    // ! 表名在mongoose默认是复述 + s
    // ? 就是数据库表映射出来的js对象
    const studentModel = model('students', studentSchema);
    // ? mongoose这个库已经帮你把数据库操作封装成了Promise对象
    // ? 增删改查 crud

    // todo 添加
    // 添加一个
    // await studentModel.insertMany({
    //     name: 'javascript',
    //     age: 88,
    //     sex: 1
    // })

    // 利用数组可添加多条数据
    // await studentModel.insertMany([{
    //     name: 'kris',
    //     age: 30,
    //     sex: 1

    // },
    // {
    //     name: 'python',
    //     age: 18,
    //     sex: 0
    // },
    // {
    //     name: 'php',
    //     age: 22,
    //     sex: 0
    // }])

    // ? 查
    // findOne找到第一个符合要求的
    // const result=await studentModel.findOne({name:'isen'});
    // console.log('result: ', result);
    // const result1=await studentModel.find({sex:0})
    // console.log('result1: ', result1);


    // ? 改
    // await studentModel.updateOne({name:'isen'},{
    //     $set:{
    //         age:120
    //     }
    // })

    // await studentModel.updateMany({sex:1},{
    //     $set:{
    //         age:18
    //     }
    // })

    // ? 删除
    // await studentModel.deleteOne({name:'php'})

    console.log('success')


}).catch((e) => {
    console.log('e===>', e)
})

