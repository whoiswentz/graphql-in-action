const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList,
} = require('graphql');
const Task = require('./types/task')

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        taskMainList: {
            type: new GraphQLList(new GraphQLNonNull(Task)),
            resolve: async (source, args, { pgApi }) => {
                return pgApi.taskMainList()
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: QueryType
})

module.exports = schema