const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin').GenerateSW;
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

/** @type import('webpack').Configuration */
module.exports = {
  mode: isDev ? 'development' : 'production',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  entry: {
    app: './src/index.tsx',
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
        loaders: ['babel-loader', 'ts-loader'],
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
    minimizer: [new TerserWebpackPlugin(), new OptimizeCSSAssetsPlugin()],
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
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
        new CopyWebpackPlugin({
          patterns: [{ from: 'assets', to: '.' }],
        }),
      ]
    : [
        new MiniCssExtractPlugin({}),
        new HtmlWebpackPlugin({
          template: './src/index.html',
          favicon: './src/favicon.ico',
          chunks: ['app', 'vendor'],
          filename: 'index.html',
        }),
        new CopyWebpackPlugin({
          patterns: [{ from: 'assets', to: '.' }],
        }),
        new WorkboxWebpackPlugin({
          swDest: 'service-worker.js',
          skipWaiting: true,
          clientsClaim: true,
        }),
      ],
  performance: {
    hints: false,
  },
  devtool: isDev ? 'inline-source-map' : false,
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 7777,
  },
};
