const base = require('./webpack.baseconfig')
const merge = require('webpack-merge').merge
module.exports = merge(base, {
  mode: 'production' // "production" \ "development" \ "none"

})
