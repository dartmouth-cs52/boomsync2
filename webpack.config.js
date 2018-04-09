const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
// set to 'production' or 'development' in your env

const finalCSSLoader = (env === 'production') ? MiniCssExtractPlugin.loader : { loader: 'style-loader' };

module.exports = {
  mode: env,
  output: { publicPath: '/' },
  entry: ['babel-polyfill', './src'], // this is where our app lives
  devtool: 'source-map', // this enables debugging with source in chrome devtools
  optimization: { // TODO fix this, something is breaking in minimize step
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'eslint-loader' },
        ],
      },
      {
        test: /\.s?css/,
        use: [
          finalCSSLoader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              name: '[name].[ext]',
            },
          },
        ],
        exclude: /\.inline.svg$/,
      },
      {
        test: /\.inline.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: require.resolve('react-svg-loader'),
            options: {
              jsx: true,
              svgo: {
                plugins: [
                  { removeTitle: false },
                  { cleanupIDs: false },
                  { removeHiddenElems: false },
                  { removeRasterImages: true },
                ],
              },
            },
          },
        ],
      },

    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/favicon.ico',
      filename: './index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/favicon.ico',
      filename: './200.html',
    }),
  ],
};


if (env === 'development') {
  module.exports.serve = {
    content: [__dirname],
    add: (app, middleware, options) => {
      const historyOptions = {
        index: '/index.html',
      };
      app.use(convert(history(historyOptions)));
    },
  };
}
