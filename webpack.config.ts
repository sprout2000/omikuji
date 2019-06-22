import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';

const isDev = process.env.NODE_ENV === 'development';

const config: webpack.Configuration = {
  mode: isDev ? 'development' : 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev ? true : false,
            },
          },
        ],
      },
      {
        test: /\.(gif|tiff|png|jpe?g|svg|eot|wof|woff|woff2|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/favicon.ico',
    }),
    new CopyWebpackPlugin([
      {
        from: 'assets',
        to: './',
        toType: 'dir',
      },
    ]),
    new MiniCSSExtractPlugin({}),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: 'service-worker.js',
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  performance: {
    hints: false,
  },
  stats: 'minimal',
  devtool: isDev ? 'source-map' : false,
};

export default config;
