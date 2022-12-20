var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

const SERVER_PORT = 4000;
const SERVER_PATH = '/graphql';

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

export default function startServer() {
    var app = express();
    app.use(SERVER_PATH, graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    }));
    app.listen(SERVER_PORT);
    console.log(`Running a GraphQL API server at http://localhost:${SERVER_PORT}${SERVER_PATH}`);
}