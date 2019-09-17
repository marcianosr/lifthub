const Query = {
  async logs(parent, args, ctx, info) {
    const logs = await ctx.db.query.logs();
    return logs;
  }
};

module.exports = Query;
