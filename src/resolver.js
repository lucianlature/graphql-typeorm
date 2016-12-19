import { GraphQLList } from 'graphql';
import invariant from 'assert';

export default function resolverFactory(target, options) {
  let resolver,
      targetAttributes,
      isModel = !!target.getTableName,
      isAssociation = !!target.associationType,
      association = isAssociation && target,
      model = isAssociation && target.target || isModel && target;

  targetAttributes = Object.keys(model.rawAttributes);

  options = options || {};

  invariant(options.include === undefined, 'Include support has been removed in favor of dataloader batching');
  if (typeof options.before === 'undefined') options.before = (options) => options;
  if (typeof options.after === 'undefined') options.after = (result) => result;
  if (typeof options.handleConnection === 'undefined') options.handleConnection = true;

  return (source, args, context, info) => {};
}
