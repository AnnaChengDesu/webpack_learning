const EslintPlugin = require('eslint-webpack-plugin')
const path = require('path')
const Minicss = require('mini-css-extract-plugin')
const MinimizerCss = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development', // "production" \ "development" \ "none"
  entry: {
    app: './src/index.js'
    // app2: './src/index2.js'
  },
  output: {
    // hash 任意模块变化每次打包都会更新
    // chunkhash 模块发生变化仅对应模块hash更新，充分利用浏览器缓存和编译缓存
    filename: '[name].[hash:4].bundle.js',
    path: path.join(__dirname, '/dist')
    // 资源放置在 CDN 上
    // publicPath: 'www.xxx.com'
  },
  devServer: {
    compress: true,
    port: 9000
  },
  resolve: {
    // 别名，提供路径的简写
    alias: {
      '@': path.join(__dirname, '/src')
    },
    // 扩展省略
    extensions: ['.js', '.css', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          // 从后往前加载
          // 'style-loader',// style-loader将css作为style标签插入js
          Minicss.loader, // 将css拆分成单独的css文件
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [Minicss.loader, 'css-loader', 'sass-loader']
      },
      // webpack 3\4 需要安装 file-loader url-loader
      // {
      //   test: /\.(jpg|jpeg|png|gif|svg)$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 5000,
      //     name: '[name].[hash:4].[ext]'
      //   }
      // },
      // webpack 5 处理原生webpack处理
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: 'asset', // asset / asset-inline / resource
        parser: {
          dataUrlCondition: {
            maxSize: 5000
          }
        },
        generator: {
          filename: '[name].[hash:4].[ext]'
        }
      },
      {
        test: /\.(tsx|ts)$/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
    new EslintPlugin(),
    new Minicss({
      filename: 'test.bundle.css'
    }),
    new MinimizerCss(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index1.html',
      chunks: ['app'],
      title: 'hhhh',
      // html压缩配置
      minify: {
        collapseWhitespace: false,
        removeAttributeQuotes: false,
        removeComments: false
      },
      // js插入的位置
      inject: 'body' // "head"
    })
    // new HtmlWebpackPlugin({
    //   template: './src/index2.html',
    //   filename: 'index2.html',
    //   chunks: ['app2']
    // })
  ],
  optimization: {
    // 单入口 => runtime + vender + 核心业务 + 异步模块
    // 多入口 => runtime + vender + 每个入口的核心业务代码 + common
    // 第三方库和公共模块分开打包
    splitChunks: {
      chunks: 'all', // all async initial
      cacheGroups: {
        vender: {
          test: /[\\/]node_modules[\\/]/,
          filename: 'vender.js',
          chunks: 'all',
          minChunks: 1 // 代码被多文件引用的最小次数
        },
        common: {
          filename: 'common.js',
          chunks: 'all',
          minChunks: 2, // 最小公用次数
          minSize: 0
        }
      }
    },
    // 运行时代码模块分割
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    }
  }
}
