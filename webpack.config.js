const EslintPlugin = require('eslint-webpack-plugin')
const path = require('path')
const Minicss = require('mini-css-extract-plugin')
const MinimizerCss = require('css-minimizer-webpack-plugin')

module.exports = {
  mode: 'production', // "production" \ "development" \ "none"
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].[hash:4].bundle.js',
    path: path.join(__dirname, '/dist')
  },
  devServer: {
    compress: true,
    port: 9000
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
    new MinimizerCss()
  ],
  optimization: {}
}
