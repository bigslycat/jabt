import createDevMiddleware from 'webpack-dev-middleware';
import createHotMiddleware from 'webpack-hot-middleware';

import config, { compiler } from '../config/webpack';

const { output: { publicPath } } = config;

export const devMiddleware = createDevMiddleware(compiler, {
  publicPath,
  watchOptions: { poll: true },
  stats: { colors: true },
  reload: true,
});
export const hotMiddleware = createHotMiddleware(compiler);
