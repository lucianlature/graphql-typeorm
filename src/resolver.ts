import invariant from 'assert';
import { Repository } from 'typeorm';

import { argsToFindOptions } from './argsToFindOptions';

export interface IColumn {
  propertyName: string;
}
export interface IMetadata {
  columns: string[];
}

export interface IResolveOptions {
  include: Object;
  before: Object;
  after: Object;
  handleConnection: boolean;
}

export function resolverFactory(repository: Repository<Entity>, resolverOptions: Object): Function {
  const metadata: IMetadata = repository.metadata;
  const targetAttributes: string[] = metadata.columns.map((columnMeta) => columnMeta.propertyName) || [];
  const options: IResolveOptions = resolverOptions || {};

  invariant(options.include === undefined, 'Include support has been removed in favor of dataloader batching');
  if (options.before === undefined) {
    options.before = (optionsBefore) => optionsBefore;
  }
  if (options.after === undefined) {
    options.after = (result) => result;
  }
  if (options.handleConnection === undefined) {
    options.handleConnection = true;
  }

  return (source, args, context, info) => {
    const findOptions: Object = argsToFindOptions(args, targetAttributes);

    return repository
            .createQueryBuilder(info.fieldName)
            .where('user.id = id', findOptions.where)
            .getOne(findOptions);
  };
}
