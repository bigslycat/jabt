import { compileFile } from 'pug';
import createTemplateMiddleware from './createTemplateMiddleware';
import decorateHotMiddleware from './decorateHotMiddleware';
import { devMiddleware, hotMiddleware } from './middlewares';

import {

  /* eslint-disable import/named */

  TPL_PATH,
  TPL_LOCALS,

  /* eslint-enable import/named */

} from './env';

const render = compileFile(TPL_PATH);

export default (req, res, next) => {
  const templateMiddleware = createTemplateMiddleware({
    locals: TPL_LOCALS,
    render,
    req,
    res,
    next,
  });

  const hotMiddlewareDecorated = decorateHotMiddleware({
    hotMiddleware,
    templateMiddleware,
    req,
    res,
  });

  devMiddleware(req, res, hotMiddlewareDecorated);
};
