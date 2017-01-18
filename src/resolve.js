// @flow

import path from 'path';

type ResolveType = (...Array<string>) => string;

const resolve: ResolveType = (...pathArgs) =>
  path.resolve(
    process.cwd(),
    ...pathArgs,
  );

export default resolve;
