module.exports = {
  devServer: {
    // 端口
    port: 8888,
    // 自动打开浏览器
    open: true
    // 跨域
    // proxy: {
    //   '/api': {
    //     target: 'http://47.107.234.173:8001',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': '/'
    //     }
    //   }
    // }
  }
}
