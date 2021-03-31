const fastify = require('fastify')
const mercurius = require('mercurius')

const env = require('./config/env')
const schema = require('./schema')

const postgres = require('./db/postgres')
const mongodb = require('./db/mongo')

const app = fastify()

app.register(mercurius, {
    schema,
    graphiql: 'playground',
    context: (request, reply) => {
        return {
            postgres,
            mongodb
        }
    }
})

app.listen(env.port, () => {
    console.log(`${env.appName} started`)
    console.table([['Port', env.port], ['Environment', env.env]])
})