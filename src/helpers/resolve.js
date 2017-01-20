// @flow

import path from 'path';

import createPathResolver from './createPathResolver';

const resolve = createPathResolver(path.resolve)(process.cwd());

export default resolve;
