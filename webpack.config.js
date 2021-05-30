const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {main: './src/pages/index.js'},
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: "main.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    host: 'localhost',
    port: 8080,
    open: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {importLoaders: 1}
        },
        'postcss-loader'
      ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/index.html',
      favicon: './notepad_30848.ico'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ]
};