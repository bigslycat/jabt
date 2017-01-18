jest.mock('pug', () => ({ compileFile: () => 'COMPILED' }));

import createMiddleware from '../src/createMiddleware';
import createTemplateMiddleware from '../src/createTemplateMiddleware';
import decorateHotMiddleware from '../src/decorateHotMiddleware';
import { devMiddleware, hotMiddleware } from '../src/middlewares';

jest.mock('../src/middlewares', () => ({
  devMiddleware: jest.fn(),
  hotMiddleware: 'HOT_MIDDLEWARE',
}));

jest.mock('../src/createTemplateMiddleware');
jest.mock('../src/decorateHotMiddleware');
jest.mock('../src/env', () => ({
  TPL_PATH: 'TPL_PATH',
  TPL_LOCALS: 'TPL_LOCALS',
  ENTRY: 'ENTRY',
}));

describe('createMiddleware()', () => {
  it('Create the main middleware', () => {
    const RES = 'RES';
    const REQ = 'REQ';
    const next = jest.fn();

    const templateMiddleware = 'TEMPLATE_MIDDLEWARE';
    const hotMiddlewareDecorated = 'HOR_MIDDLEWARE_DECORATED';

    createTemplateMiddleware.mockImplementation(() => templateMiddleware);
    decorateHotMiddleware.mockImplementation(() => hotMiddlewareDecorated);

    createMiddleware(REQ, RES, next);

    expect(createTemplateMiddleware).toHaveBeenCalledTimes(1);
    expect(createTemplateMiddleware).toHaveBeenCalledWith({
      locals: 'TPL_LOCALS',
      render: 'COMPILED',
      req: REQ,
      res: RES,
      next,
    });

    expect(decorateHotMiddleware).toHaveBeenCalledTimes(1);
    expect(decorateHotMiddleware).toHaveBeenCalledWith({
      hotMiddleware,
      templateMiddleware,
      req: REQ,
      res: RES,
    });

    expect(devMiddleware).toHaveBeenCalledTimes(1);
    expect(devMiddleware).toHaveBeenCalledWith(REQ, RES, hotMiddlewareDecorated);
  });
});
