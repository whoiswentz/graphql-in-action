const fastify = require('fastify')
const mercurius = require('mercurius')

const env = require('./config/env')
const schema = require('./schema')

const pgApiWrapper = require('./db/pgApi')
const mongodb = require('./db/mongo')

const app = fastify()

async function main () {
    const pgApi = await pgApiWrapper()

    app.register(mercurius, {
        schema,
        graphiql: 'playground',
        context: (request, reply) => {
            return {
                pgApi
            }
        },
    })
    
    app.listen(env.port, async () => {
        console.log(`${env.appName} started`)
        console.table([['Port', env.port], ['Environment', env.env]])
    })
}

main().catch(console.error)