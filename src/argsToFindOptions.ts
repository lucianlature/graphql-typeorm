import * as R from "ramda-ts";
import replaceWhereOperators from "./replaceWhereOperators";

interface IValue {
  prop: string
}

interface WhereFilterType {
  [key: string]: IValue;
}

interface Filters {
    where?: WhereFilterType,
    limit?: number,
    offset?: number,
    order?: string[],
}

const aggregate = (
  key: string,
  index: number, 
  arr: string[],
  filters: Filters,
  args: WhereFilterType,
  targetAttributes: Object[]
) => {
  // if (targetAttributes.indexOf(key) !== -1) {
  filters.where[key] = args[key];
  /*
  // }
  const limit = (currentValue === "limit" && args[currentValue]) ? parseInt(args[currentValue], 10) : 1
  */
  /*
  if (key === 'offset' && args[key]) {
    result.offset = parseInt(args[key], 10);
  }

  if (key === 'order' && args[key]) {
    if (args[key].indexOf('reverse:') === 0) {
      result.order = [[args[key].substring(8), 'DESC']];
    } else {
      result.order = [[args[key], 'ASC']];
    }
  }

  if (key === 'where' && args[key]) {
    // setup where
    result.where = replaceWhereOperators(args.where);
  }
  */
  return filters;
}

export default function argsToFindOptions(args: Object, targetAttributes: string[]): Object {
  const defaultFilters: Filters = {
    where: {},
    limit: 1,
    offset: 1,
    order: [],
  };

  const setFilter = R.partialRight(aggregate, [ defaultFilters, args, targetAttributes ]);
  const filters = Object.keys(args).forEach(setFilter);

  return Object.assign({}, defaultFilters, filters);
}
