const EslintPlugin = require('eslint-webpack-plugin')
const path = require('path')

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
      }
    ]
  },
  plugins: [
    new EslintPlugin()
  ],
  optimization: {}
}
