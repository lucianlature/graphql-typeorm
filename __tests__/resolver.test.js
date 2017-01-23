"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// import reflect-metadata shim
require("reflect-metadata");
var graphql_1 = require("graphql");
var helper_1 = require("./support/helper");
var resolver_1 = require("../src/resolver");
// import test models
var User_1 = require("./models/User");
var Task_1 = require("./models/Task");
// https://facebook.github.io/jest/docs/api.html#jestusefaketimers
jest.useFakeTimers();
var userA;
var userB;
var schema;
var connection = null;
/**
 * Setup the a) testing db schema and b) the according GraphQL types
 *
 * The schema consists of a User that has Tasks.
 * A Task belongs to a Project, which can have Labels.
 */
var taskType = new graphql_1.GraphQLObjectType({
    name: 'Task',
    description: 'A task',
    fields: {
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        title: {
            type: graphql_1.GraphQLString
        }
    }
});
var userType = new graphql_1.GraphQLObjectType({
    name: 'User',
    description: 'A user',
    fields: {
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        name: {
            type: graphql_1.GraphQLString
        },
        tasks: {
            type: new graphql_1.GraphQLList(taskType),
            args: {
                limit: {
                    type: graphql_1.GraphQLInt
                },
                offset: {
                    type: graphql_1.GraphQLInt
                },
                order: {
                    type: graphql_1.GraphQLString
                },
                first: {
                    type: graphql_1.GraphQLInt
                }
            }
        },
        tasksByIds: {
            type: new graphql_1.GraphQLList(taskType),
            args: {
                ids: {
                    type: new graphql_1.GraphQLList(graphql_1.GraphQLInt)
                }
            }
        }
    }
});
/**
 * Now fill the testing DB with fixture values
 * We'll have projectA & projectB with two random labels each,
 * and two users each with some tasks that belong to those projects.
 */
beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
    var taskId, userRepository;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = 0;
                userA = new User_1["default"]({
                    id: 2,
                    name: "a" + Math.random().toString(),
                    tasks: [
                        new Task_1["default"]({
                            id: (taskId += 1),
                            title: Math.random().toString(),
                            createdAt: new Date(Date.UTC(2016, 7, 11))
                        }),
                        new Task_1["default"]({
                            id: (taskId += 1),
                            title: Math.random().toString(),
                            createdAt: new Date(Date.UTC(2016, 7, 16))
                        }),
                        new Task_1["default"]({
                            id: (taskId += 1),
                            title: Math.random().toString(),
                            createdAt: new Date(Date.UTC(2016, 7, 20))
                        }),
                    ]
                });
                userB = new User_1["default"]({
                    id: 1,
                    name: "b" + Math.random().toString(),
                    tasks: [
                        new Task_1["default"]({
                            id: (taskId += 1),
                            title: Math.random().toString(),
                            createdAt: new Date(Date.UTC(2016, 5, 11))
                        }),
                        new Task_1["default"]({
                            id: (taskId += 1),
                            title: Math.random().toString(),
                            createdAt: new Date(Date.UTC(2016, 5, 16))
                        }),
                        new Task_1["default"]({
                            id: (taskId += 1),
                            title: Math.random().toString(),
                            createdAt: new Date(Date.UTC(2016, 5, 20))
                        }),
                    ]
                });
                return [4 /*yield*/, helper_1["default"]()];
            case 1:
                connection = _a.sent();
                userRepository = connection && connection.getRepository(User_1["default"]);
                // save the user instances
                // await userRepository.persist(userA);
                return [4 /*yield*/, (userRepository && userRepository.persist(userB))];
            case 2:
                // save the user instances
                // await userRepository.persist(userA);
                _a.sent();
                schema = new graphql_1.GraphQLSchema({
                    query: new graphql_1.GraphQLObjectType({
                        name: 'RootQueryType',
                        fields: {
                            user: {
                                type: userType,
                                args: {
                                    id: {
                                        type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
                                    }
                                },
                                resolve: resolver_1["default"](userRepository)
                            },
                            users: {
                                type: new graphql_1.GraphQLList(userType),
                                args: {
                                    limit: {
                                        type: graphql_1.GraphQLInt
                                    },
                                    order: {
                                        type: graphql_1.GraphQLString
                                    }
                                },
                                resolve: resolver_1["default"](userRepository)
                            }
                        }
                    })
                });
                return [2 /*return*/];
        }
    });
}); });
xit('should resolve a plain result with a single model', function () { return __awaiter(_this, void 0, void 0, function () {
    var user, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = userA;
                return [4 /*yield*/, graphql_1.graphql(schema, "\n    {\n      user(id: " + user.id + ") {\n        name\n      }\n    }\n  ")];
            case 1:
                result = _a.sent();
                if (result.errors)
                    throw new Error(result.errors[0].stack);
                expect(result.data).toEqual({
                    user: {
                        name: user.name
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
it('should resolve a plain result with two single models', function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, graphql_1.graphql(schema, "\n    {\n      userB: user(id: " + userB.id + ") {\n        name\n      }\n    }\n  ")];
            case 1:
                result = _a.sent();
                // console.info(result.data);
                if (result.errors)
                    throw new Error(result.errors[0].stack);
                expect(result.data).toEqual({
                    userB: {
                        name: userB.name
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
/*
xit('should resolve a array result with a model and aliased includes', function () {
  return graphql(schema, `
    {
      users {
        name
        first: tasks(limit: 1) {
          title
        }
        rest: tasks(offset: 1, limit: 99) {
          title
        }
      }
    }
  `).then(function (result) {
    if (result.errors) throw new Error(result.errors[0].stack);

    result.data.users.forEach(function (user) {
      expect(user.first).to.be.ok;
      expect(user.rest).to.be.ok;
    });
  });
});

xit('should resolve a array result with a model and aliased includes and __typename', function () {
  return graphql(schema, `
    {
      users {
        name
        first: tasks(limit: 1) {
          title
          __typename
        }
      }
    }
  `).then(function (result) {
    if (result.errors) throw new Error(result.errors[0].stack);

    result.data.users.forEach(function (user) {
      expect(user.first[0].__typename).to.equal('Task');
    });
  });
});

xit('should resolve an array result with a single model', function () {
  var users = this.users;

  return graphql(schema, `
    {
      users {
        name
      }
    }
  `).then(function (result) {
    if (result.errors) throw new Error(result.errors[0].stack);

    expect(result.data.users).to.have.length.above(0);

    const usersNames = users.map(user => ({name: user.name}));
    // As the GraphQL query doesn't specify an ordering,
    // the order of the two lists can not be asserted.
    expect(result.data.users).to.deep.have.members(usersNames);
  });
});

xit('should allow amending the find for a array result with a single model', function () {
  var user = this.userA
    , schema;

  schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        users: {
          type: new GraphQLList(userType),
          args: {
            limit: {
              type: GraphQLInt
            },
            order: {
              type: GraphQLString
            }
          },
          resolve: resolver(User, {
            before: function (options, args, {name}) {
              options.where = options.where || {};
              options.where.name = name;
              return options;
            }
          })
        }
      }
    })
  });

  return graphql(schema, `
    {
      users {
        name
      }
    }
  `, null, {
    name: user.name
  }).then(function (result) {
    if (result.errors) throw new Error(result.errors[0].stack);

    expect(result.data.users).to.have.length(1);
    expect(result.data.users[0].name).to.equal(user.name);
  });
});

xit('should allow parsing the find for a array result with a single model', function () {
  var users = this.users
    , schema;

  schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        users: {
          type: new GraphQLList(userType),
          args: {
            limit: {
              type: GraphQLInt
            },
            order: {
              type: GraphQLString
            }
          },
          resolve: resolver(User, {
            after: function (result) {
              return result.map(function () {
                return {
                  name: '11!!'
                };
              });
            }
          })
        }
      }
    })
  });

  return graphql(schema, `
    {
      users {
        name
      }
    }
  `).then(function (result) {
    if (result.errors) throw new Error(result.errors[0].stack);

    expect(result.data.users).to.have.length(users.length);
    result.data.users.forEach(function (user) {
      expect(user.name).to.equal('11!!');
    });
  });
});

xit('should work with a resolver through a proxy', function () {
  var users = this.users
    , schema
    , userType
    , taskType
    , spy = sinon.spy();

  taskType = new GraphQLObjectType({
    name: 'Task',
    description: 'A task',
    fields: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      title: {
        type: GraphQLString
      }
    }
  });

  userType = new GraphQLObjectType({
    name: 'User',
    description: 'A user',
    fields: {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      name: {
        type: GraphQLString,
      },
      tasks: {
        type: new GraphQLList(taskType),
        resolve: (function () {
          var $resolver = resolver(User.Tasks)
            , $proxy;

          $proxy = function () {
            return $resolver.apply(null, Array.prototype.slice.call(arguments));
          };

          $proxy.$proxy = $resolver;
          return $proxy;
        }())
      }
    }
  });

  schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        users: {
          type: new GraphQLList(userType),
          args: {
            limit: {
              type: GraphQLInt
            },
            order: {
              type: GraphQLString
            }
          },
          resolve: resolver(User)
        }
      }
    })
  });

  return graphql(schema, `
    {
      users {
        name,
        tasks {
          title
        }
      }
    }
  `, null, {
    logging: spy
  }).then(function (result) {
    if (result.errors) throw new Error(result.errors[0].stack);

    expect(result.data.users).to.have.length(users.length);
    result.data.users.forEach(function (user) {
      expect(user.tasks).to.have.length.above(0);
    });

    expect(spy).to.have.been.calledTwice;
  });
});

xit('should work with a passthrough resolver and a duplicated query', function () {
  var users = this.users
    , schema
    , userType
    , taskType
    , spy = sinon.spy();

  taskType = new GraphQLObjectType({
    name: 'Task',
    description: 'A task',
    fields: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      title: {
        type: GraphQLString
      }
    }
  });

  userType = new GraphQLObjectType({
    name: 'User',
    description: 'A user',
    fields: {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      name: {
        type: GraphQLString,
      },
      tasks: {
        type: new GraphQLObjectType({
          name: 'Tasks',
          fields: {
            nodes: {
              type: new GraphQLList(taskType),
              resolve: resolver(User.Tasks)
            }
          }
        }),
        resolve: (function () {
          var $resolver;

          $resolver = function (source) {
            return source;
          };

          $resolver.$passthrough = true;

          return $resolver;
        }())
      }
    }
  });

  schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        users: {
          type: new GraphQLList(userType),
          args: {
            limit: {
              type: GraphQLInt
            },
            order: {
              type: GraphQLString
            }
          },
          resolve: resolver(User)
        }
      }
    })
  });

  return graphql(schema, `
    {
      users {
        name,
        tasks {
          nodes {
            title
          }
          nodes {
            id
          }
        }
      }
    }
  `, null, {
    logging: spy
  }).then(function (result) {
    if (result.errors) throw new Error(result.errors[0].stack);

    expect(result.data.users).to.have.length(users.length);
    result.data.users.forEach(function (user) {
      expect(user.tasks.nodes).to.have.length.above(0);
      user.tasks.nodes.forEach(function (task) {
        expect(task.title).to.be.ok;
        expect(task.id).to.be.ok;
      });
    });

    expect(spy).to.have.been.calledTwice;
  });
});

xit('should resolve an array result with a single model and limit', function () {
  return graphql(schema, `
    {
      users(limit: 1) {
        name
      }
    }
  `).then(function (result) {
    if (result.errors) throw new Error(result.errors[0].stack);

    expect(result.data.users).to.have.length(1);
  });
});

xit('should resolve a plain result with a single hasMany association', function () {
  const user = this.userB;

  return graphql(schema, `
    {
      user(id: ${user.id}) {
        name
        tasks {
          title
          taskVirtual
        }
      }
    }
  `, null, {
    yolo: 'swag'
  }).then(function (result) {
    if (result.errors) throw new Error(result.errors[0].stack);

    expect(result.data.user.name).to.equal(user.name);

    expect(result.data.user.tasks).to.have.length.above(0);
    // As the order of user.tasks is nondeterministic, we only assert on equal members
    // of both the user's tasks and the tasks the graphql query responded with.
    const userTasks = user.tasks.map(task => ({title: task.title, taskVirtual: 'tasktask'}));
    expect(result.data.user.tasks).to.deep.have.members(userTasks);
  });

});

xit('should resolve a plain result with a single limited hasMany association', function () {
  var user = this.userB;

  return graphql(schema, `
    {
      user(id: ${user.id}) {
        name
        tasks(limit: 1) {
          title
        }
      }
    }
  `).then(function (result) {
    if (result.errors) throw new Error(result.errors[0].stack);

    expect(result.data.user.tasks).to.have.length(1);
  });
});

xit('should resolve a array result with a single hasMany association', function () {
  var users = this.users;

  return graphql(schema, `
    {
      users(order: "id") {
        name
        tasks(order: "id") {
          title
        }
      }
    }
  `).then(function (result) {
    if (result.errors) throw new Error(result.errors[0].stack);

    expect(result.data.users.length).to.equal(users.length);
    result.data.users.forEach(function (user) {
      expect(user.tasks).length.to.be.above(0);
    });

    expect(result.data).to.deep.equal({
      users: users.map(function (user) {
        return {
          name: user.name,
          tasks: user.tasks.map(task => ({title: task.title}))
        };
      })
    });
  });
});

xit('should resolve a array result with a single limited hasMany association', function () {
  var users = this.users;

  return graphql(schema, `
    {
      users {
        name
        tasks(limit: 1) {
          title
        }
      }
    }
  `).then(function (result) {
    if (result.errors) throw new Error(result.errors[0].stack);

    expect(result.data.users.length).to.equal(users.length);
    result.data.users.forEach(function (user) {
      expect(user.tasks).length.to.be(1);
    });
  });
});

xit('should resolve a array result with a single limited
hasMany association with a nested belongsTo relation', function () {
  var users = this.users
    , sqlSpy = sinon.spy();

  return graphql(schema, `
    {
      users {
        tasks(limit: 2) {
          title
          project {
            name
          }
        }
      }
    }
  `, null, {
    logging: sqlSpy
  }).then(function (result) {
    if (result.errors) throw new Error(result.errors[0].stack);

    expect(result.data.users.length).to.equal(users.length);
    result.data.users.forEach(function (user) {
      expect(user.tasks).length.to.be(2);
      user.tasks.forEach(function (task) {
        expect(task.project.name).to.be.ok;
      });
    });

    expect(sqlSpy.callCount).to.equal(3);
  });
});

xit('should resolve a array result with a single hasMany association with a nested belongsTo relation', function () {
  var users = this.users
    , sqlSpy = sinon.spy();

  return graphql(schema, `
    {
      users {
        tasks {
          title
          project {
            name
          }
        }
      }
    }
  `, null, {
    logging: sqlSpy
  }).then(function (result) {
    if (result.errors) throw new Error(result.errors[0].stack);

    expect(result.data.users.length).to.equal(users.length);
    result.data.users.forEach(function (user) {
      expect(user.tasks).length.to.be.above(0);
      user.tasks.forEach(function (task) {
        expect(task.project.name).to.be.ok;
      });
    });

    expect(sqlSpy.callCount).to.equal(3);
  });
});

xit('should resolve a array result with a single hasMany association' +
    'with a nested belongsTo relation with a nested hasMany relation', function () {
  var users = this.users
    , sqlSpy = sinon.spy();

  return graphql(schema, `
    {
      users {
        tasks {
          title
          project {
            name
            labels {
              name
            }
          }
        }
      }
    }
  `, null, {
    logging: sqlSpy
  }).then(function (result) {
    if (result.errors) throw new Error(result.errors[0].stack);

    expect(result.data.users.length).to.equal(users.length);
    result.data.users.forEach(function (user) {
      expect(user.tasks).length.to.be.above(0);
      user.tasks.forEach(function (task) {
        expect(task.project.name).to.be.ok;

        expect(task.project.labels).length.to.be.above(0);
        task.project.labels.forEach(function (label) {
          expect(label.name).to.be.ok;
        });
      });
    });

    expect(sqlSpy.callCount).to.equal(4);
  });
});

xit('should resolve a array result with a single limited hasMany association with a before filter', function () {
  var users = this.users;

  return graphql(schema, `
    {
      users {
        tasks(first: 2) {
          title
        }
      }
    }
  `).then(function (result) {
    if (result.errors) throw new Error(result.errors[0].stack);

    expect(result.data.users.length).to.equal(users.length);
    result.data.users.forEach(function (user) {
      expect(user.tasks).length.to.be(2);
    });
  });
});

xit('should not call association getter if user manually included', function () {
  this.sandbox.spy(Task, 'findAll');
  this.sandbox.spy(User, 'findAll');

  var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        users: {
          type: new GraphQLList(userType),
          resolve: resolver(User, {
            before: function (options) {
              options.include = [User.Tasks];
              options.order = [
                ['id'],
                [{ model: Task, as: 'tasks' }, 'id', 'ASC']
              ];
              return options;
            }
          })
        }
      }
    })
  });

  return graphql(schema, `
    {
      users {
        tasks {
          title
        }
      }
    }
  `).then(result => {
    if (result.errors) throw new Error(result.errors[0].stack);

    expect(Task.findAll.callCount).to.equal(0);
    expect(User.findAll.callCount).to.equal(1);
    expect(User.findAll.getCall(0).args[0].include).to.have.length(1);
    expect(User.findAll.getCall(0).args[0].include[0].name).to.equal(User.Tasks.name);

    result.data.users.forEach(function (user) {
      expect(user.tasks).length.to.be.above(0);
    });

    expect(result.data).to.deep.equal({
      users: this.users.map(function (user) {
        return {
          tasks: user.tasks.map(task => ({title: task.title}))
        };
      })
    });
  });
});

xit('should allow async before and after', function () {
  var users = this.users
    , schema;

  schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        users: {
          type: new GraphQLList(userType),
          args: {
            limit: {
              type: GraphQLInt
            },
            order: {
              type: GraphQLString
            }
          },
          resolve: resolver(User, {
            before: function (options) {
              return Promise.resolve(options);
            },
            after: async function (result) {
              await Promise.delay(100);
              return result.map(function () {
                return {
                  name: 'Delayed!'
                };
              });
            }
          })
        }
      }
    })
  });

  return graphql(schema, `
    {
      users {
        name
      }
    }
  `).then(function (result) {
    if (result.errors) throw new Error(result.errors[0].stack);

    expect(result.data.users).to.have.length(users.length);
    result.data.users.forEach(function (user) {
      expect(user.name).to.equal('Delayed!');
    });
  });
});

xit('should resolve args from array to before', function () {
  var user = this.userB;

  return graphql(schema, `
    {
      user(id: ${user.get('id')}) {
        tasksByIds(ids: [${user.tasks[0].get('id')}]) {
          id
        }
      }
    }
  `).then(function (result) {
    if (result.errors) throw new Error(result.errors[0].stack);

    expect(result.data.user.tasksByIds.length).to.equal(1);
  });
});
*/
