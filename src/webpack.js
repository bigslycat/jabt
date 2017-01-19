import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';

import {

  /* eslint-disable import/named */

  ENTRY,
  PATH,
  PUBLIC,
  FILENAME,
  NODE_ENV,

  IS_DEV,

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
    path: PATH,
    publicPath: PUBLIC,
    filename: FILENAME,
  },

  plugins: [
    ...(IS_DEV ? [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ] : []),

    // new ExtractTextPlugin('components.css'),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
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
    loaders: [
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
    ],
  },

  target: 'web',
};
