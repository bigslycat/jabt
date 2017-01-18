// @flow

import path from 'path';

import resolve from './resolve';
import getRc from './getRc';

const rc = getRc();

export const {
  ENTRY = rc.entry || './index.js',

  PATH = rc.path || resolve('dist'),
  PUBLIC = rc.publicPath || '/',
  FILENAME = rc.filename || 'bundle.js',
  NODE_ENV = 'development',

  TPL_PATH = rc.tplPath || path.resolve(__dirname, '..', 'src', 'template.pug'),
  TPL_LOCALS = rc.locals || {},
} = process.env;
