const fastify = require('fastify')
const mercurius = require('mercurius')
const {printSchema} = require('graphql')

const schema = require('./schema')

const app = fastify()
app.register(mercurius, {
    schema,
    graphiql: 'playground',
})

app.listen(3000, () => {
    console.log('runing')
    console.log(printSchema(schema))
})