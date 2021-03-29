const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
} = require('graphql');
const NumberInRange = require('./numbers-in-range')

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        currentTime: {
            type: GraphQLString,
            resolve: () => {
                return new Date().toISOString()
            }
        },
        sumNumbersInRange: {
            type: NumberInRange,
            args: {
                begin: { type: new GraphQLNonNull(GraphQLInt) },
                end: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: (source, { begin, end }) => {
                if (end < begin) {
                    throw new Error(`Invalid range because ${end} < ${begin}`)
                }
                let sum = 0
                let count = 0
                for (let i = begin; i <= end; i++) {
                    sum += i;
                    count += 1
                }
                return {sum, count};
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: QueryType
})

module.exports = schema