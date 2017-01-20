#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { join } from 'path';
import { compileFile } from 'pug';

import webpackConfig, { compiler } from '../config/webpack';
import {

  /* eslint-disable import/named */

  TPL_PATH,
  TPL_LOCALS,

  /* eslint-enable import/named */

} from '../config/env';

compiler.run((err, stats) => {
  if (err) {
    console.error(err.stack || err);

    if (err.details) console.error(err.details);

    process.exit(1);
  }

  console.log(stats.toString({
    colors: true,
  }));

  if (stats.hasErrors() || stats.hasWarnings()) process.exit(1);

  const html = compileFile(TPL_PATH)(TPL_LOCALS);

  writeFileSync(join(webpackConfig.output.path, 'index.html'), html);
});
