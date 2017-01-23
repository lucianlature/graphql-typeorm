"use strict";
var R = require("ramda-ts");
var aggregate = function (key, index, arr, filters, args, targetAttributes) {
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
};
function argsToFindOptions(args, targetAttributes) {
    var defaultFilters = {
        where: {},
        limit: 1,
        offset: 1,
        order: []
    };
    var setFilter = R.partialRight(aggregate, [defaultFilters, args, targetAttributes]);
    var filters = Object.keys(args).forEach(setFilter);
    return Object.assign({}, defaultFilters, filters);
}
exports.__esModule = true;
exports["default"] = argsToFindOptions;
