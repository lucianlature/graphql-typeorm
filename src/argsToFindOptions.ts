import * as R from 'ramda-ts';
import replaceWhereOperators from './replaceWhereOperators';

interface IValue {
  prop: string;
}

interface IWhereFilterType {
  [key: string]: IValue;
}

interface IFilters {
  where?: IWhereFilterType;
  limit?: number;
  offset?: number;
  order?: string[];
}

const aggregate: Function = (
  key: string,
  index: number,
  arr: string[],
  filters: IFilters,
  args: IWhereFilterType,
  targetAttributes: Object[],
) => {
  if (targetAttributes.indexOf(key) !== -1) {
    filters.where[key] = args[key];
  }

  if (key === 'offset' && args[key]) {
    filters.offset = parseInt(args[key], 10);
  }

  if (key === 'order' && args[key]) {
    if (args[key].indexOf('reverse:') === 0) {
      filters.order = [[args[key].substring(8), 'DESC']];
    } else {
      filters.order = [[args[key], 'ASC']];
    }
  }

  if (key === 'where' && args[key]) {
    // Setup "where" filter
    filters.where = replaceWhereOperators(args.where);
  }

  return filters;
};

export function argsToFindOptions(args: Object, targetAttributes: string[]): Object {
  const defaultFilters: IFilters = {
    where: {},
    limit: 1,
    offset: 1,
    order: [],
  };

  const setFilter: (
    key: string,
    index: number,
    arr: string[],
    filters: IFilters,
    args: Object,
    attrs: string[],
  ) => IFilters = R.partialRight(aggregate, [defaultFilters, args, targetAttributes]);
  const filters: IFilters = Object.keys(args).forEach(setFilter);

  return Object.assign({}, defaultFilters, filters);
}
