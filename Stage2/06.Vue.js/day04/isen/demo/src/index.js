// ? webpack 是把所有的静态文件 打包成 js
// ? 如果是非js文件，则需要通过 loader 进行转换，将非js文件转换成js文件，再打包

// ? 导入 index.css 文件
import './index.css';

// ? 导入，如果是直接export的，需要写花括号
// ? 变量名需要对应,相当于解构
// import { a , main } from './a';


// console.log(a);

// main();

// ? 如果是导入一个模块的默认内容，直接写
// ? 变量不用对应
// import xxx from './a'
// console.log('xxx: ', xxx);

// ? 和在一起
// import c ,{ a , main } from './a';
// console.log(c)
// console.log(a)
// main();

// ? 改名
// import { a as aa } from './a'; 
// console.log('aa: ', aa);

// ? 将所有都导入,除了默认以外的所有导出
// ? 用任意变量来接，是一个对象，里面包含了所有的导出
// import * as abc from './a';
// console.log('abc: ', abc.a);
// abc.main();


// import { a } from './b';
// a();

console.log(12313123131312312)


