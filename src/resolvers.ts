import { ResolverMap } from './types/graphql-utils';

export const resolvers: ResolverMap  = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) => `Hey ${name || 'world'}`
  },
  Mutation: {
    register: (_, {}: GQL.IRegisterOnMutationArguments) => {}
  }
};