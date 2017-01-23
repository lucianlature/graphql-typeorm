import invariant from 'assert'
import argsToFindOptions from './argsToFindOptions'

export default function resolverFactory(repository: any, resolverOptions: Object|any): Function {
  const metadata = repository.metadata;
  const targetAttributes = metadata.columns.map((columnMeta) => columnMeta.propertyName) || [];
  const options = resolverOptions || {};

  invariant(options.include === undefined, 'Include support has been removed in favor of dataloader batching');
  if (typeof options.before === 'undefined') options.before = (optionsBefore) => optionsBefore;
  if (typeof options.after === 'undefined') options.after = (result) => result;
  if (typeof options.handleConnection === 'undefined') options.handleConnection = true;

  const resolver = (source, args, context, info) => {
    const findOptions = argsToFindOptions(args, targetAttributes);

    return repository
            .createQueryBuilder(info.fieldName)
            .where('user.id = id', findOptions.where)
            .getOne(findOptions);
  };

  return resolver;
}

