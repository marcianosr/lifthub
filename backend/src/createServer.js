const { GraphQLServer } = require("graphql-yoga");

const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const db = require("./db");

const createServer = () =>
  new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Mutation,
      Query
      // Log: {
      //   async log(parent, args, ctx, info) {
      //     // get the ID out of the url
      //     const log = await ctx.db.query.log({
      //       where: { id: "ck333qabycc7e09190vhfzbul" }
      //     });
      //     // .excersise();

      //     console.log("log", log);

      //     return log;
      //   }
      // }
      // Relations clearly need to be done through "type resolvers"
      // https://www.prisma.io/tutorials/a-guide-to-common-resolver-patterns-ct08/
      // https://www.apollographql.com/docs/graphql-tools/resolvers/
      // Log: {
      //   async excersise(parent) {
      //     const excersise = await db.query.excersises();

      //     console.log("excersise", excersise);

      //     return excersise;
      //   }
      // }
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    // Acces db from resolvers on every request
    context: req => ({ ...req, db })
  });

module.exports = createServer;
