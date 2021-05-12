const webpack = require('webpack');

const path = require('path');

module.exports = {
  mode: 'production',

  entry: './coroutine.ts',

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      '.ts', '.js',
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.wasm', '.mjs', '.js', '.json'],
    mainFields: ['browser', 'module', 'main'],
    mainFiles: ['index']
  }
};