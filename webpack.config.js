module.exports = {
    mode: 'production', // "production" \ "development" \ "none"
    entry: {
        app: "./src/index.js"
    },
    output: {
        filename: '[name].[hash:4].bundle.js',
        path: __dirname + '/dist'
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    },
    plugins: [],
    optimization: {},
}