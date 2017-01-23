/** @flow */
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var typeorm = require("typeorm");
var TaskSchema_1 = require("../entities/TaskSchema");
var UserSchema_1 = require("../entities/UserSchema");
var User_1 = require("../models/User");
if (typeof afterEach !== 'undefined') {
}
function createConnection(options) {
    if (options === void 0) { options = {}; }
    var env = process.env;
    var type = env.TYPE || 'sqlite';
    var driver = {
        host: '',
        username: '',
        database: '',
        password: ''
    };
    switch (type) {
        case 'postgres':
            driver = {
                host: env.POSTGRES_PORT_5432_TCP_ADDR,
                username: env.POSTGRES_ENV_POSTGRES_USER,
                password: env.POSTGRES_ENV_POSTGRES_PASSWORD,
                database: env.POSTGRES_ENV_POSTGRES_DATABASE
            };
            if (env.CI) {
                driver = Object.assign(driver, {
                    username: 'postgres',
                    password: '',
                    database: 'test'
                });
            }
            break;
        case 'mysql':
            driver = {
                host: env.MYSQL_PORT_3306_TCP_ADDR,
                username: env.MYSQL_ENV_MYSQL_USER,
                password: env.MYSQL_ENV_MYSQL_PASSWORD,
                database: env.MYSQL_ENV_MYSQL_DATABASE
            };
            if (env.CI) {
                driver = Object.assign(driver, {
                    username: 'travis',
                    password: '',
                    database: 'test'
                });
            }
            break;
        default: driver = {};
    }
    var config = Object.assign({
        host: 'localhost',
        username: 'graphql_typeorm_test',
        password: 'graphql_typeorm_test',
        database: 'graphql_typeorm_test'
    }, driver);
    var driverOptions = __assign({ type: type, port: 5432, host: config.host, username: config.username, password: config.password, database: config.database }, options);
    return typeorm.createConnection({
        driver: driverOptions,
        entities: [User_1["default"]],
        entitySchemas: [
            // here we load all entity schemas we need
            TaskSchema_1["default"],
            UserSchema_1["default"],
        ],
        logging: {
            logQueries: false,
            logFailedQueryError: true
        },
        autoSchemaSync: true
    });
}
exports.__esModule = true;
exports["default"] = createConnection;
