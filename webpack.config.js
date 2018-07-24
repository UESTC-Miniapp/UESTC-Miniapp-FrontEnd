module.exports = {
  loaders: [
    { test: /\.css$/, loader: 'style!css!px2rpx?rpxUnit=75&rpxPrecision=8' }
  ]
}
