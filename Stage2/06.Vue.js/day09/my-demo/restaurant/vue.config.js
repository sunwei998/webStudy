const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  // ? 代理服务器
  // ? 往本机发送的请求，都会代理到这个服务器上
  devServer: {
    proxy: {
      // * 以/api开头的请求,代理到目标服务器
      '/api1': {
        // * 目标地址
        target: 'http://49.235.98.65:8889',
        ws: true,
        // * 是否跨域
        changeOrigin: true,
        // * 路径重写
        // ? 当/api1开头的，重写成/
        pathRewrite: {
          '^/api1': '/',
        },
      },
      '/api2': {
        // * 目标地址
        target: 'http://49.235.98.65:3000',
        ws: true,
        // * 是否跨域
        changeOrigin: true,
        // * 路径重写
        // ? 当/api1开头的，重写成/
        pathRewrite: {
          '^/api2': '/',
        },
      },
    },
  },
});
