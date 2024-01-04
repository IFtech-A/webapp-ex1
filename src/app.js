const { Sequelize } = require('sequelize')
const dbConfig = require('./config/db')
const { Umzug, SequelizeStorage } = require('umzug')
const app = require('express')()

const sequelize = new Sequelize(dbConfig)

const umzug = new Umzug({
    migrations: {
        glob: 'src/migrations/*.js',
        resolve: ({ name, path, context }) => {
            const migration = require(path)
            return {
                // adjust the parameters Umzug will
                // pass to migration methods when called
                name,
                up: async () => migration.up(context, Sequelize),
                down: async () => migration.down(context, Sequelize),
            }
        },   
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize })
})

const APP_PORT = 3000

const usersController = require('./controllers/users-controller')

app.post('/:userId/:amount', usersController.updateBalance)


async function main () {
    await umzug.up();
    
    app.listen(APP_PORT, () => {
        console.info(`Webapp listening on port ${APP_PORT}`)
    })
}

main()