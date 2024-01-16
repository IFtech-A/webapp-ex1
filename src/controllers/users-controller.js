
const validator = require('validator')
const usersService = require('../services/users-service')

async function updateBalance(req, res) {
    let { amount } = req.params

    if (!validator.isNumeric(amount)) {
        return res.status(400).json({
            error: "Bad Request"
        })
    }

    amount = parseInt(amount)

    const changed = await usersService.updateBalance('', amount)

    if (changed === 0) {
        return res.status(400).json({
            error: "Insufficient amount"
        })
    }

    return res.sendStatus(200)
}

module.exports = {
    updateBalance
}