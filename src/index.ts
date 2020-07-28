import { join } from "path";
import { mergeSchemas } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
// import * as express from "express";
// import { graphqlHTTP } from "express-graphql";
import { GraphQLServer } from 'graphql-yoga';
import * as fs from "fs";

import { createConnection } from "typeorm";

export const startServer = async () => {
  const schemas: GraphQLSchema[] = [];
  const folders = fs.readdirSync(join(__dirname, "./modules"));
  folders.forEach((folder) => {
    const { resolvers } = require(`./modules/${folder}/resolvers`);
    const schema = loadSchemaSync(
      join(__dirname, `./modules/${folder}/schema.graphql`),
      {
        loaders: [new GraphQLFileLoader()],
      }
    );
    schemas.push(addResolversToSchema({resolvers, schema}))
  });

  // const schema = loadSchemaSync(
  //   join(__dirname, "./schema.graphql"),
  //   {
  //     loaders: [new GraphQLFileLoader()],
  //   }
  // );
  // Add resolvers to the schema
  const server = new GraphQLServer({
    schema: mergeSchemas({schemas}),
  });
  await createConnection();
  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000
  });
  console.info(`Server listening on http://localhost:4000`);
  return app;
  /* tslint:disable:no-unused-variable */
  // const app = express();
  // app.use(
  //   graphqlHTTP({
  //     schema: schemaWithResolvers,
  //     graphiql: true,
  //   })
  // );
  // await app.listen(4000);
  // console.info(`Server listening on http://localhost:4000`);
};

startServer();
