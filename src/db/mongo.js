const { MongoClient } = require('mongodb')

const env = require('../config/env')

const client = new MongoClient(env.mongoUrl)

async function connect() {
    try {
        return await client.connect()
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = connect