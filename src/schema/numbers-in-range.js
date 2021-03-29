const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
} = require('graphql');

const NumbersInRange = new GraphQLObjectType({
    name: 'NumbersInRange',
    description: 'Aggregate info on range of numbers',
    fields: {
        sum: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        count: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    }
})

module.exports = NumbersInRange