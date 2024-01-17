

const rabbitmqService = require('./services/rabbitmq-service')
const cronService = require('./services/cron-service')
async function init() {
    await rabbitmqService.init()
    cronService.init()
}

async function main() {
    await init()
    await cronService.pollTask()
}

main()
