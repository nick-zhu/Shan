const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: './src/index.js',
  devtool: process.env.USE_DEVTOOL ? 'cheap-module-source-map' : false,
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new cleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/template/index.html',
      favicon: 'favicon.ico'
    })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  // resolve: {
  //   extensions: ['.js', '.jsx']
  // }
};

if (!process.env.USE_DEVTOOL) {
  const UJSplugin = new UglifyJSPlugin();
  config.plugins.push(UJSplugin);
}

module.exports = config;