import decorateHotMiddleware from '../src/decorateHotMiddleware';

describe('decorateHotMiddleware()', () => {
  it('Binds arguments to hotMiddleware', () => {
    const hotMiddleware = jest.fn();

    const templateMiddleware = 'TPL';

    const req = 'REQ';
    const res = 'RES';

    const decorated = decorateHotMiddleware({
      hotMiddleware,
      templateMiddleware,
      req,
      res,
    });

    decorated();

    expect(hotMiddleware).toHaveBeenCalledTimes(1);
    expect(hotMiddleware).toHaveBeenCalledWith(req, res, templateMiddleware);
  });
});
