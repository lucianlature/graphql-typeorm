import { GraphQLList } from 'graphql'
import argsToFindOptions from './argsToFindOptions'
import invariant from 'assert'

export default function resolverFactory(repository, options) {
  let resolver,
      targetAttributes,
      target = repository.target,
      schemaName = target.name,
      metadata = repository.metadata;/*,
      isModel = !!schema.getTableName,
      isAssociation = !!schema.associationType,
      association = isAssociation && schema,
      model = isAssociation && schema.target || isModel && schema;*/

  targetAttributes = metadata.columns.map(columnMeta => columnMeta.propertyName) || [];

  options = options || {};

  invariant(options.include === undefined, 'Include support has been removed in favor of dataloader batching');
  if (typeof options.before === 'undefined') options.before = (options) => options;
  if (typeof options.after === 'undefined') options.after = (result) => result;
  if (typeof options.handleConnection === 'undefined') options.handleConnection = true;

  resolver = (source, args, context, info) => {
    let findOptions = argsToFindOptions(args, targetAttributes);

    return repository
            .createQueryBuilder(info.fieldName)
            .where('user.id = id', findOptions.where)
            .getOne(findOptions);
    // return await model[list ? 'findAll' : 'findOne'](findOptions);
  };

  return resolver;
}

