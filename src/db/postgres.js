const { Pool } = require('pg')

const env = require('../config/env')

async function connect() {
    const pgPool = new Pool({ connectionString: env.postgreUrl })

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
        pool: pgPool,
        close: async () => await pgPool.close()
    }
}

module.exports = connect