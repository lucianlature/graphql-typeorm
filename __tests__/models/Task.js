/** @flow */
"use strict";
var Task = (function () {
    function Task(_a) {
        var _b = _a === void 0 ? {} : _a, id = _b.id, title = _b.title, createdAt = _b.createdAt;
        this.id = id;
        this.title = title;
        this.createdAt = createdAt;
    }
    return Task;
}());
exports.__esModule = true;
exports["default"] = Task;
