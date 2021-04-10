const pgConnect = require('./postgres')
const sqls = require('./sqls')

const pgApiWrapper = async () => {
    const { pgPool } = await pgConnect()

    const pgQuery = (text, params = {}) =>
        pgPool.query(text, Object.values(params))

    return {
        taskMainList: async () => {
            const pgResp = await pgQuery(sqls.taskMainList)
            return pgResp.rows
        }
    }
}

module.exports = pgApiWrapper