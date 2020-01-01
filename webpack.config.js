const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

/** @type import('webpack').Configuration */
module.exports = {
  mode: isDev ? 'development' : 'production',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  entry: {
    app: './src/App.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.(bmp|gif|jpe?g|png|svg|ttf|eot|woff?2?)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
  plugins: isDev
    ? [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          favicon: './src/favicon.ico',
          chunks: ['app', 'vendor'],
          filename: 'index.html',
        }),
        new CopyWebpackPlugin([
          {
            from: 'assets',
            to: '.',
            toType: 'dir',
          },
        ]),
      ]
    : [
        new MiniCssExtractPlugin({}),
        new HtmlWebpackPlugin({
          template: './src/index.html',
          favicon: './src/favicon.ico',
          chunks: ['app', 'vendor'],
          filename: 'index.html',
        }),
        new CopyWebpackPlugin([
          {
            from: 'assets',
            to: '.',
            toType: 'dir',
          },
        ]),
        new WorkboxWebpackPlugin.GenerateSW({
          swDest: 'service-worker.js',
          skipWaiting: true,
          clientsClaim: true,
        }),
      ],
  devtool: isDev ? 'inline-source-map' : false,
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 7777,
    open: true,
  },
};
