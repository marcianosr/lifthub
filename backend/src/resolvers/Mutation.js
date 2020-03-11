// Root for all mutations on the server side.

const Mutation = {
	// mutate data for the prisma db (use the generated api methods, schema.graphql)

	async createLog(parent, args, ctx, info) {
		// Get input data with 'args' arguments.
		// 'createLog' method is coming form them generated api, schema.graphql.
		// ctx.db.mutation returns a promise

		console.log("args", args);
		console.log("args.data.excersises", args.data.excersises);
		const log = await ctx.db.mutation.createLog(
			{
				...args
			},
			info
		); // item is returned when it is created

		return log;
	},

	async updateLog(parent, args, ctx, info) {
		// <TOD></TOD>O Update id's of all tpyes
		console.log("update args", args);

		const updatedLog = await ctx.db.mutation.updateLog(
			{
				...args
			},
			info
		);

		return updatedLog;
	}
};

module.exports = Mutation;
