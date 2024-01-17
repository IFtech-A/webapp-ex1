
const taskService = require('../services/task-service')

async function list(req, res) {

    const tasks = await taskService.getUnfinishedTasks()

    return res.status(200).json(tasks)
}

module.exports = {
    list
}