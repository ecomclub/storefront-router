'use strict'

const devMode = process.env.NODE_ENV !== 'production'
const path = require('path')

const output = {
  library: 'EcomRouter',
  libraryTarget: 'umd',
  libraryExport: 'default',
  path: path.resolve(__dirname, 'dist'),
  filename: 'ecom-router.min.js',
  globalObject: 'this'
}

const config = {
  mode: devMode ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src/index.js'),
  output,
  devServer: {
    contentBase: path.resolve(__dirname, 'test'),
    compress: true,
    port: 9224,
    open: true
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
}

module.exports = devMode ? config : [
  {
    ...config,
    externals: /^(core-js|@ecomplus\/utils|@ecomplus\/client)/i
  },

  {
    ...config,
    output: {
      ...output,
      filename: output.filename.replace('.min.js', '.bundle.min.js')
    }
  },

  {
    ...config,
    target: 'node',
    optimization: {
      minimize: false
    },
    output: {
      ...output,
      filename: output.filename.replace('.min.js', '.node.js')
    },
    externals: /^(@ecomplus\/utils|@ecomplus\/client)/i
  },

  {
    ...config,
    output: {
      ...output,
      libraryTarget: 'var',
      filename: output.filename.replace('.min.js', '.var.min.js')
    },
    externals: {
      '@ecomplus/utils': 'ecomUtils',
      '@ecomplus/client': 'ecomClient'
    }
  }
]
