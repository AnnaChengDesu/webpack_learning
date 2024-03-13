const base = require('./webpack.baseconfig')
const merge = require('webpack-merge').merge
module.exports = merge(base, {
  mode: 'development', // "production" \ "development" \ "none"
  devtool: 'eval', // "eval" \ "source-map" \ "hidden-source-map" \ "inline-source-map" \
  // 原理：使用express起一个node服务，并使用webpackdevmiddleware
  devServer: {
    compress: true,
    port: 9000,
    // 热更新不刷新页面会保留状态局部更新
    // js代码强制更新，不刷 新页面不保留状态
    hot: true, // 主要应用于资源文件
    // 解决开发模式下的跨域问题
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' }
      }
    }
  }
})
