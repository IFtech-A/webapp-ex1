const { Op } = require('sequelize');
const db = require('../models')

async function updateBalance(userId, newBalance) {
    const { users } = db;
    const options = { where : {}}

    if (newBalance < 0) {
        options.where = { balance: {[Op.gte]: -(newBalance) }}
    }

    const [[_,affectedCount]] = await users.increment({ balance: newBalance }, options)
    console.log({affectedCount})

    return affectedCount
}


module.exports = {
    updateBalance
}