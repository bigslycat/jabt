import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';

import {

  /* eslint-disable import/named */

  ENTRY,
  OUTPUT_PATH,
  PUBLIC,
  FILENAME,
  NODE_ENV,

  IS_DEV,
  IS_PROD,

  /* eslint-enable import/named */

} from './env';


export default {
  devtool: '#source-map',

  entry: [
    ...ENTRY.split(/, ?/),

    ...(IS_DEV ? [
      'webpack-hot-middleware/client',
    ] : []),
  ],

  resolve: { extensions: ['.js', '.jsx'] },

  output: {
    path: OUTPUT_PATH,
    publicPath: PUBLIC,
    filename: FILENAME,
  },

  plugins: [
    ...(IS_DEV ? [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ] : []),

    new ExtractTextPlugin('components.css'),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      IS_DEV: JSON.stringify(IS_DEV),
      IS_PROD: JSON.stringify(IS_PROD),
    }),

    // new HtmlWebpackPlugin(),

    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: [
              'last 5 versions',
              'ie >= 9',
            ],
          }),
        ],
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            ['latest', { modules: false }],
            'stage-0',
            'react',
          ],

          ...(IS_DEV ? {
            plugins: ['react-hot-loader/babel'],
          } : {}),
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?importLoaders=1!postcss-loader',
        }),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!postcss-loader!less-loader',
        }),
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader',
        ],
      },
    ],
  },

  ...(IS_DEV ? {
    devServer: {
      hot: true,
      publicPath: '/',
    },
  } : {}),

  target: 'web',
};
