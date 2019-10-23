const Mutation = {
  // mutate data for the prisma db (use the generated api methods, schema.graphql)

  async createLog(parent, args, ctx, info) {
    // Get input data with 'args' arguments.
    // 'createLog' method is coming form them generated api, schema.graphql.
    // ctx.db.mutation returns a promise

    // console.log("args", args);
    const log = await ctx.db.mutation.createLog(
      {
        data: {
          ...args.data
        }
      },
      info
    ); // item is returned when it is created

    // console.log("mutation:", log);
    return log;
  }
};

module.exports = Mutation;
