import createTemplateMiddleware from '../src/createTemplateMiddleware';

const PATH = 'PATH';
const LOCALS = 'LOCALS';
const RENDER = 'RENDER';

const render = jest.fn(() => RENDER);
const index = { includes: jest.fn() };
const req = { path: PATH };
const res = { send: jest.fn() };
const next = jest.fn();

const templateMiddleware = createTemplateMiddleware({
  locals: LOCALS,
  render,
  index,
  req,
  res,
  next,
});

describe('createTemplateMiddleware()', () => {
  it('Middleware renders the template when req.path value is exists in index array', () => {
    index.includes.mockImplementation(() => true);

    templateMiddleware();

    expect(render).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenCalledWith(LOCALS);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(RENDER);

    expect(index.includes).toHaveBeenCalledTimes(1);
    expect(index.includes).toHaveBeenCalledWith(PATH);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('Middleware renders the template when req.path value is not exists in index array', () => {
    jest.resetAllMocks();
    index.includes.mockImplementation(() => false);

    templateMiddleware();

    expect(render).toHaveBeenCalledTimes(0);

    expect(res.send).toHaveBeenCalledTimes(0);

    expect(index.includes).toHaveBeenCalledTimes(1);
    expect(index.includes).toHaveBeenCalledWith(PATH);

    expect(next).toHaveBeenCalledTimes(1);
  });
});
