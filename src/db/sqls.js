module.exports = {
    taskMainList: `SELECT id,
                          content,
                          tags,
                          approach_count as "approachCount",
                          created_at as "createdAt"
                    FROM azdev.tasks
                    WHERE is_private = FALSE
                    ORDER BY created_at DESC
                    LIMIT 100`
}