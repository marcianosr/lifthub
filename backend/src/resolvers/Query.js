/////////////////////////////////////////////////
//
// QUERY RESOLVERS:
// Root for all queriy resolvers on the server side.
// Expose the API here.
//
/////////////////////////////////////////////////

const Query = {
  async logs(parent, args, ctx, info) {
    // get the user ID here
    const logsByUserId = await ctx.db.query.logs();

    return logsByUserId;
  },

  async user(parent, args, ctx, info) {
    const logsByUserId = await ctx.db.query.user(
      {
        // Hardcoded user id from myself
        where: { id: "ck0fbsbqdmq1k0b536of5ncwq" }
      },
      info
    );

    return logsByUserId;
  },

  async log(parent, args, ctx, info) {
    // get the ID out of the url

    const { id } = args;

    const log = await ctx.db.query.log(
      {
        where: { id }
      },
      info // Research this "info" var because it seems to do the relational trick.
    );

    return log;
  }
};

module.exports = Query;
