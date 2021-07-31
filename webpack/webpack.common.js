const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    contentScript: './src/contentScript.ts',
    popup: './src/popup/index.tsx',
    background: './src/background.ts',
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: 'src/popup/index.html',
      inject: 'body',
      chunks: ['popup'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/manifest.json' },
        { from: './src/popup/index.css' },
        { from: './src/icons/icon16.png' },
        { from: './src/icons/icon24.png' },
        { from: './src/icons/icon32.png' },
        { from: './src/icons/icon48.png' },
        { from: './src/icons/icon64.png' },
        { from: './src/icons/icon128.png' },
      ],
    }),
  ],
}
