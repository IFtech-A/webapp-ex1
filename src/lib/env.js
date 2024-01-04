
function env(varName, defaultValue) {

    if (varName in process.env) {
        return process.env[varName]
    }

    if (defaultValue === undefined) {
        process.exit(`Environment variable ${varName} is required`)
    }

    return defaultValue
}

module.exports = env