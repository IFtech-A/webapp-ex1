const cron = require('node-cron')
const rabbitmqService = require('./rabbitmq-service')
const taskService = require('./task-service')
const { default: Client } = require('ioredis')
const { default: Redlock } = require('redlock')

const redis = new Client({ host: 'localhost' })
const redlock = new Redlock([redis], {
    retryCount: 0,
})
const workerName = process.argv[2] || 'dispatcher'


const createTasks = (prefix) => {
    const tasks = []
    for (let i = 1; i <= 10; i++) {
        const name = `${prefix}_${i}`
        tasks.push({
            name,
            schedule: `*/${i % 2 + 1} * * * *`,
            fn: async (task) => {
                return new Promise(async (resolve) => {
                    let lock = null;
                    try {
                        lock = await redlock.acquire([task.taskName], 5000)
                    } catch (e) {
                        return resolve(false)
                    }
                    taskService.startProcessing(task, workerName)
                    setTimeout(async () => {
                        await redlock.release(lock)
                        resolve(true)
                    }, 2 * 60 * 1000 + Math.random() * 3000)
                });
            }
        })
    }
    return tasks
}

let tasks = []
function init() {
    tasks = createTasks('task')
}

async function startTasks() {
    for (const task of tasks) {
        cron.schedule(task.schedule, async () => {
            // send to rabbitmq topic
            await rabbitmqService.dispatchTask(task)
        })
    }
}

async function pollTask() {
    const tasksFn = tasks.reduce((r, curr)=>{
        r[curr.name] = curr.fn
        return r
    },{})
    return await rabbitmqService.pollTasks(tasksFn)
}


module.exports = {
    init,
    startTasks,
    pollTask
}