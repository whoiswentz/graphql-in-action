const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require("graphql");

const Task = new GraphQLObjectType({
    name: 'task',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        content: {
            type: new GraphQLNonNull(GraphQLString)
        },
        approachCount: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        tags: {
            type: new GraphQLNonNull(
                new GraphQLList(new GraphQLNonNull(GraphQLString))
            )
        },
        createdAt: {
            type: new GraphQLNonNull(GraphQLString)
        }
    }
})

module.exports = Task