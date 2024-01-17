const { tasks } = require('../models');
const moment = require('moment')

async function create(task) {
    return tasks.create(task)
}

async function getTask(id) {
    return tasks.findByPk(id)
}

async function getUnfinishedTasks() {
    const list = await tasks.findAll({
        attributes: ['taskName','startedAt', 'createdAt', 'server'],
        where: {
            finished: false,
        },
        order: [
            ['createdAt', 'ASC']
        ],
        raw: true
    })
    list.forEach((t) => {
        if (t.startedAt) {
            t.sinceStart = moment().diff(moment(t.startedAt), 's')
        }
        if (t.createdAt) {
            t.sinceCreate = moment().diff(moment(t.createdAt), 's')
        }
        return t
    })
    return list 

}

async function taskFinish(task) {
    const recentTask = await getTask(task.id)
    return tasks.update({
        finished: true,
        finishedAt: new Date(),
        duration: moment().diff(moment(recentTask.startedAt), 's')
    }, {where: {id: task.id}})
}

async function startProcessing(task, server) {
    return tasks.update({
        startedAt: new Date(),
        server,
    }, {where: {id: task.id}})
}

module.exports = {
    create,
    getTask,
    taskFinish,
    startProcessing,
    getUnfinishedTasks
}