// @flow

type ResolverType = (...Array<string>) => string;

type CreateResolverType = (resolve: ResolverType) =>
  (...Array<string>) =>
    ResolverType;

const createPathResolver: CreateResolverType = resolve =>
  (...rootPath) =>
    (...pathArgs) => resolve(...[
      ...rootPath,
      ...pathArgs,
    ]);

export default createPathResolver;
