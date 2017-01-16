require('babel-register');

import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './benchmark/schema';

const app = express();

/**
 * HOW TO run the benchmarks:
 *
 * sudo docker-compose up -d postgres
 * sudo docker-compose run benchmark_server node test/benchmark/seed.js
 * npm run build && sudo docker-compose kill benchmark_server && sudo docker-compose up -d benchmark_server
 * ab -p test/benchmark/[FILE].json -T application/json -n 500 -c 20 http://localhost:4001/graphql
 */

app.use('/graphql', graphqlHTTP({
  schema,
  formatError: error => {
    console.log(error.stack);
    return {
      message: error.message,
      locations: error.locations,
      stack: error.stack
    };
  }
}));

app.listen(4001, function () {
  console.log('Benchmarking server listening on port 4001');
});