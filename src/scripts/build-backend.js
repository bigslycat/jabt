#!/usr/bin/env node

import {
  writeFileSync,
  readFileSync,
} from 'fs';

import { mkdir } from 'shelljs';

import { resolve, relative, dirname } from 'path';
import { transformFileSync } from 'babel-core';
import { sync as glob } from 'glob';

import createPathResolver from '../helpers/createPathResolver';
import rootResolve from '../helpers/resolve';

import {

  /* eslint-disable import/named */

  SRC,
  BUILD,

  /* eslint-enable import/named */

} from '../config/env';

const createResolver = createPathResolver(resolve);
const createRelative = createPathResolver(relative);

const srcResolve = createResolver(SRC);
const buildResolve = createResolver(BUILD);
const dirResolve = createResolver(__dirname);

const srcRelative = createRelative(SRC);

const babelrc = JSON.parse((() => {
  try {
    return readFileSync(rootResolve('.babelrc'), 'utf8');
  } catch (e) {
    return readFileSync(dirResolve('../../.babelrc'), 'utf8');
  }
})());

glob(srcResolve('**/*.js'))
  .forEach((srcPath) => {
    const relativePath = srcRelative(srcPath);
    const buildPath = buildResolve(relativePath);

    try {
      const { code } = transformFileSync(srcPath, {
        babelrc: false,
        ...babelrc,
      });

      mkdir('-p', dirname(buildPath));
      writeFileSync(buildPath, code, 'utf8');

      console.log('Done %s --> %s\n', srcPath, buildPath);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });
