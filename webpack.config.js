const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const DISTPATH = path.join(__dirname, 'dist');
const SRCPATH = path.join(__dirname, 'src');
module.exports = {
  mode: 'development',
  entry: { app: './src/index.tsx' },
  output: {
    filename: 'js/[name].[chunkhash:8].bundle.js',
    path: DISTPATH,
  },

  devtool: 'cheap-module-source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'content/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(ts|tsx)$/,
            include: SRCPATH,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true, // we use fork plugin
                },
              },
            ],
          },
          {
            test: /\.css$/,
            exclude: SRCPATH,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.css$/,
            include: SRCPATH,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    postcssPresetEnv({
                      stage: 2,
                      features: {
                        'nesting-rules': true,
                      },
                    }),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'content/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Tron DEX',
      template: path.join(__dirname, 'templates/index.html'),
    }),
    // remove automatic load of all moment js locales
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: path.join(__dirname, 'src'),
      tsconfig: path.join(__dirname, 'tsconfig.json'),
      //   tslint: paths.appTsLint,
    }),
  ],

  devServer: {
    contentBase: DISTPATH,
  },
};
