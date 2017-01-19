// @flow

import path from 'path';

import resolve from './resolve';
import getRc from './getRc';

const rc = getRc();

export const DEV = 'development';
export const PROD = 'production';

export const {
  ENTRY = rc.entry || './index.js',

  PATH = rc.path || resolve('dist'),
  PUBLIC = rc.publicPath || '/',
  FILENAME = rc.filename || 'bundle.js',
  NODE_ENV = DEV,

  TPL_PATH = rc.tplPath ?
    resolve(...(Array.isArray(rc.tplPath) ? rc.tplPath : [rc.tplPath])) :
    path.resolve(__dirname, '..', 'src', 'template.pug'),

  TPL_LOCALS = rc.locals || {},
} = process.env;

export const IS_DEV = NODE_ENV === DEV;
export const IS_PROD = NODE_ENV === PROD;
