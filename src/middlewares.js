import webpack from 'webpack';
import createDevMiddleware from 'webpack-dev-middleware';
import createHotMiddleware from 'webpack-hot-middleware';

import config from './webpack';

const compiler = webpack(config);

const { output: { publicPath } } = config;

export const devMiddleware = createDevMiddleware(compiler, { publicPath });
export const hotMiddleware = createHotMiddleware(compiler);
