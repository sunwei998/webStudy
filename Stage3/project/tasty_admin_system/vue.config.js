const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        // * 目标地址
        target: 'http://49.235.98.65:8889/',
        ws: true,
        // * 是否跨域
        changeOrigin: true,
        // * 路径重写
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
});
