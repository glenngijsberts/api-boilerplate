/*
  Yoga server config. Add new resolvers in here. The prisma
  client gets imported here as well and will be made available
  on the context of the request.
*/
const { prisma } = require('./generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')

function yogaServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Query,
      Mutation,
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: (req) => ({ ...req, prisma }),
  })
}

module.exports = yogaServer
