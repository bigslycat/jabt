import { resolve as pathResolve } from 'path';

import resolve from '../../src/helpers/resolve';

jest.mock('path');
process.cwd = jest.fn();

describe('resolve()', () => {
  it('Resolve a relative path from $PWD and returns absolute path', () => {
    const ARGS = [1, 2, 3];
    const PATH = 'PATH';
    const CWD = 'CWD';

    process.cwd.mockImplementation(() => CWD);
    pathResolve.mockImplementation(() => PATH);

    const result = resolve(...ARGS);

    expect(pathResolve).toHaveBeenCalledTimes(1);
    expect(pathResolve).toHaveBeenCalledWith(CWD, ...ARGS);

    expect(result).toEqual(PATH);
  });
});
