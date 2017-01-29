import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';

import {

  /* eslint-disable import/named */

  CONTEXT,
  ENTRY,
  OUTPUT_PATH,
  PUBLIC,
  FILENAME,
  NODE_ENV,

  IS_DEV,
  IS_PROD,

  /* eslint-enable import/named */

} from './env';

const cssLoader = [
  'css-loader?modules&importLoaders=1&localIdentName=[hash:base64:5]',
  'postcss-loader',
];

const lessLoader = [
  ...cssLoader,
  'less-loader',
];

const config = {
  context: CONTEXT,

  entry: [
    ...(IS_DEV ? [
      'webpack-hot-middleware/client',
    ] : []),

    ...ENTRY.split(/, ?/),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-native': 'react-native-web',
    },
  },

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

    ...(IS_PROD ? [
      new webpack.optimize.UglifyJsPlugin(),
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
        context: CONTEXT,
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
          loader: cssLoader.join('!'),
        }),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: lessLoader.join('!'),
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
    devtool: '#source-map',

    devServer: {
      hot: true,
      publicPath: '/',
    },
  } : {}),

  target: 'web',
};

export const compiler = webpack(config);

export default config;
