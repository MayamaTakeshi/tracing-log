const path = require('path')
const m = require('moment')

function getStack() {
    const orig = Error.prepareStackTrace
    Error.prepareStackTrace = function (_, stack) {
       return stack
    }
    const err = new Error()
    Error.captureStackTrace(err, arguments.callee)
    const stack = err.stack
    Error.prepareStackTrace = orig
    return stack
}

function gen_trace(level) {
    const stack = getStack()
    const item = stack[level]
    const func_name = item.getFunctionName()
    const line = item.getLineNumber()
    const tokens = item.getFileName().split(path.sep)
    const file = tokens[tokens.length-1]
    return `${file}:${line}:${func_name}`
}

const logger = {
    ERROR: 3,
    WARN: 4,
    INFO: 5,
    DEBUG: 7,

    level: 7,

    levels: {
        3: 'ERROR',
        4: 'WARN',
        5: 'INFO',
        7: 'DEBUG',
    },
    log: (level, msg) => {
        if(level <= logger.level) {
            console.log(`${m().format("YYYY-MM-DD HH:mm:ss.SSS")} ${logger.levels[level]} ${gen_trace(2)}: ${msg}`)
        }
    },
    set_log_function: log_function => {
        logger.log = (level, msg) => {
            const trace = gen_trace(2)
            log_function(level, `${trace} ${msg}`)
        }
    },
}

module.exports = logger
