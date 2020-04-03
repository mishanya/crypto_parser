const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
var path = require('path');

module.exports = {
  entry:
    [ 'webpack-dev-server/client?http://0.0.0.0:5000',
      'webpack/hot/only-dev-server', // WebpackDevServer host and port
 // "only" prevents reload on syntax errors
      "./src/index.js"
    ]
  ,
  devtool: "inline-source-map",

  devServer: {
    port: 5000,
      contentBase: './src',
    hot: true,
     disableHostCheck: true,
    historyApiFallback: true
    },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
            presets:["@babel/preset-env",  "@babel/preset-react" ]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
          test: /\.(jpg|jpeg|png|svg)$/,
         use: {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash].[ext]',
              outputPath: '/',
              publicPath: '/src',
            },
          }
      }     
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  output: {
    publicPath: '/',

    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'src')
  }
};