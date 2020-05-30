// Root for all mutations on the server side.

const Mutation = {
	// mutate data for the prisma db (use the generated api methods, schema.graphql)

	async createLog(parent, args, ctx, info) {
		// Get input data with 'args' arguments.
		// 'createLog' method is coming form them generated api, schema.graphql.
		// ctx.db.mutation returns a promise

		console.log("args", args);
		console.log("args.data.excersises", args.data.excersise);
		const log = await ctx.db.mutation.createLog(
			{
				...args,
			},
			info
		); // item is returned when it is created

		return log;
	},

	async updateLog(parent, args, ctx, info) {
		console.log("update args", args);

		const updatedLog = await ctx.db.mutation.updateLog(
			{
				...args,
			},
			info
		);

		return updatedLog;
	},

	async upsertLog(parent, args, ctx, info) {
		console.log("upsert args", args);

		const upsertedLog = await ctx.db.mutation.upsertLog(
			{
				...args,
			},
			info
		);

		return upsertedLog;
	},

	async deleteManyExcersises(parent, args, ctx, info) {
		console.log("deleted args", args);

		const deletedExcersises = await ctx.db.mutation.deleteManyExcersises({
			...args,
		});

		return deletedExcersises;
	},

	async deleteManySets(parent, args, ctx, info) {
		console.log("deleted args", args);

		const deletedSets = await ctx.db.mutation.deleteManySets({
			...args,
		});

		return deletedSets;
	},
};

module.exports = Mutation;
