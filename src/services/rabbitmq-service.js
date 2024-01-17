const amqp = require('amqplib');
const taskService = require('./task-service')

let channel = null

const taskQueueTopic = 'webapp_tasks' 

async function init() {
    const rabbitmq = await amqp.connect('amqp://guest:guest@localhost')
    channel = await rabbitmq.createChannel()
    await channel.assertQueue(taskQueueTopic)
}


async function dispatchTask(task) {
    task = await taskService.create({
        taskName: task.name,
        createdAt: new Date(),
    })
    await channel.sendToQueue(
        taskQueueTopic,
        Buffer.from(JSON.stringify(Object.assign(task, {timestamp: Date.now()})))
    )
}

async function pollTasks(tasksFn) {
    return await channel.consume(taskQueueTopic, async (msg) => {
        const task = JSON.parse(msg.content.toString())
        if (!task?.taskName) {
            channel.ack(msg)
            return
        }
        
        const handler = tasksFn[task.taskName]
        const processed = await handler(task)       
        if (processed) {
            await channel.ack(msg)
            await taskService.taskFinish(task)

        }
    }, { noAck: false })
}

module.exports = {
    init,
    dispatchTask,
    pollTasks
}