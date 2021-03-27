const fastify = require('fastify')

const { ApolloServer } = require('apollo-server-fastify')

const apolloServer = new ApolloServer({
    // typeDefs,
    //resolvers,
})
const appServer = fastify()

apolloServer.start().then(() => {
    appServer.register(apolloServer.createHandler())
    appServer.listen(3000, () => {
        console.log('server running')
    })
})