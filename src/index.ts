import { join } from 'path';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import * as express from 'express';
import {graphqlHTTP} from 'express-graphql';

import { resolvers } from './resolvers'
import {createConnection} from 'typeorm';

// Load schema from the file
const schema = loadSchemaSync(join(__dirname, './schema.graphql'), {
  loaders: [
    new GraphQLFileLoader(),
  ]
});

// Add resolvers to the schema
const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers,
});

/* tslint:disable:no-unused-variable */
createConnection().then(() => {
  const app = express();
  app.use(
    graphqlHTTP({
        schema: schemaWithResolvers,
        graphiql: true,
    })
  );
  app.listen(4000, () => {
    console.info(`Server listening on http://localhost:4000`)
  })
})

