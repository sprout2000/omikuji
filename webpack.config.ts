import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin';

import path from 'path';

const isDev = process.env.NODE_ENV === 'development';

const config: Configuration = {
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
        use: ['babel-loader', 'ts-loader'],
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
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerWebpackPlugin()],
  },
  plugins: isDev
    ? [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          favicon: './src/favicon.ico',
          chunks: ['app'],
          filename: 'index.html',
          inject: 'body',
          scriptLoading: 'blocking',
          minify: !isDev,
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
          chunks: ['app'],
          filename: 'index.html',
          inject: 'body',
          scriptLoading: 'defer',
          minify: !isDev,
        }),
        new CopyWebpackPlugin({
          patterns: [{ from: 'assets', to: '.' }],
        }),
        new WorkboxWebpackPlugin.GenerateSW({
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

export default config;
