

const rabbitmqService = require('./services/rabbitmq-service')
const cronService = require('./services/cron-service')
async function init() {
    await rabbitmqService.init()
    await cronService.init()
}

async function main() {
    await init()
    await cronService.startTasks()
}

main()
