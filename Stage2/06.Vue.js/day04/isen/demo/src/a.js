// ? es6 提供了 一种方式进行 导入/导出
// ? import / export

// ? 导出
export const a = 1;

const b = 3;

export function main(){
    console.log('main');
}

// ? 模块默认导出
// ? 一个模块只有一个默认导出
const c = 1;
export default c;
