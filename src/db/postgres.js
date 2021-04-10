const { Pool } = require('pg')

const env = require('../config/env')

async function connect() {
    const pgPool = new Pool({ 
        host: 'localhost',
        user: 'postgres',
        password: 'password',
        port: 5432
     })

    const client = await pgPool.connect()
    const tableCountResp = await client.query(
        'select count(*) from information_schema.tables where table_schema = $1;',
        ['azdev']
    );
    client.release()

    console.log(
        'Connected to PostgreSQL | Tables count:',
        tableCountResp.rows[0].count
    );

    pgPool.on('error', (err) => {
        console.error('Unexpected PG client error', err);
        process.exit(-1);
    });

    return {
        pgPool,
        pgPoolClose: async () => await pgPool.close()
    }
}

module.exports = connect