const fastify = require('fastify')
const mercurius = require('mercurius')

const env = require('./config/env')
const schema = require('./schema')

const app = fastify()

app.register(mercurius, {
    schema,
    graphiql: 'playground',
})

app.listen(env.port, () => {
    console.log(`${env.appName} started`)
    console.table([['Port', env.port], ['Environment', env.env]])
})