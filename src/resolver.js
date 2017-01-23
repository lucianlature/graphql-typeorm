"use strict";
var assert_1 = require("assert");
var argsToFindOptions_1 = require("./argsToFindOptions");
function resolverFactory(repository, resolverOptions) {
    var metadata = repository.metadata;
    var targetAttributes = metadata.columns.map(function (columnMeta) { return columnMeta.propertyName; }) || [];
    var options = resolverOptions || {};
    assert_1["default"](options.include === undefined, 'Include support has been removed in favor of dataloader batching');
    if (typeof options.before === 'undefined')
        options.before = function (optionsBefore) { return optionsBefore; };
    if (typeof options.after === 'undefined')
        options.after = function (result) { return result; };
    if (typeof options.handleConnection === 'undefined')
        options.handleConnection = true;
    var resolver = function (source, args, context, info) {
        var findOptions = argsToFindOptions_1["default"](args, targetAttributes);
        return repository
            .createQueryBuilder(info.fieldName)
            .where('user.id = id', findOptions.where)
            .getOne(findOptions);
    };
    return resolver;
}
exports.__esModule = true;
exports["default"] = resolverFactory;
