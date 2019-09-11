// Connecting to the remote prisma db
// and gives us the ability to query data and do our CRUD opererations with JavaScript
// like we did on the playground (https://eu1.prisma.sh/marciano-schildmeijer-5bbae1/lifthub/dev)

const { Prisma } = require("prisma-binding");

const db = new Prisma({
  typeDefs: "./generated/schema.graphql", // to see what types are available (the generated schema.graphql file)
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: true
});

module.exports = db;
