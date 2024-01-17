const env = require('../lib/env')

module.exports = {
    dialect: 'postgres',
    database: env('DB_NAME', 'webapp'),
    username: env('DB_USERNAME', 'webapp_user'),
    password: env('DB_PASSWORD'),
    host: env('DB_HOST', 'localhost'),
    port: env('DB_PORT', '5432'),
    logging: false
}