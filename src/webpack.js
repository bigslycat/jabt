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

  /* eslint-enable import/named */

} from './env';


export default {
  devtool: '#source-map',

  entry: [
    'webpack-hot-middleware/client',

    ...ENTRY.split(/, ?/),
  ],

  output: {
    path: PATH,
    publicPath: PUBLIC,
    filename: FILENAME,
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin({
      multiStep: false,
    }),
    new webpack.NoErrorsPlugin(),

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
