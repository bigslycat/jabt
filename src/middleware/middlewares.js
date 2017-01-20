import createDevMiddleware from 'webpack-dev-middleware';
import createHotMiddleware from 'webpack-hot-middleware';

import config, { compiler } from '../config/webpack';

const { output: { publicPath } } = config;

export const devMiddleware = createDevMiddleware(compiler, { publicPath });
export const hotMiddleware = createHotMiddleware(compiler);
