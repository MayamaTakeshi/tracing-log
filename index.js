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

const ERROR = 3
const WARN  = 4
const INFO  = 5
const DEBUG = 7

const levels = {}
levels[ERROR] = 'ERROR'
levels[WARN]  = 'WARN'
levels[INFO]  = 'INFO'
levels[DEBUG] = 'DEBUG'

const logger = {
    ERROR: ERROR,
    WARN: WARN,
    INFO: INFO,
    DEBUG: DEBUG,

    level: 7,

    levels: levels,

    out_func: (level, msg) => {
        console.log(`${m().format("YYYY-MM-DD HH:mm:ss.SSS")} ${logger.levels[level]} ${msg}`)
    },

    error: (msg) => {
        if(ERROR <= logger.level) {
            const trace = gen_trace(2)
            logger.out_func(ERROR, `${trace} ${msg}`)
        }
    },

    warn: (msg) => {
        if(WARN <= logger.level) {
            const trace = gen_trace(2)
            logger.out_func(WARN, `${trace} ${msg}`)
        }
    },

    info: (msg) => {
        if(INFO <= logger.level) {
            const trace = gen_trace(2)
            logger.out_func(INFO, `${trace} ${msg}`)
        }
    },

    debug: (msg) => {
        if(DEBUG <= logger.level) {
            const trace = gen_trace(2)
            logger.out_func(DEBUG, `${trace} ${msg}`)
        }
    },

    log: (level, msg) => {
        if(level <= logger.level) {
            const trace = gen_trace(2)
            logger.out_func(level, `${trace} ${msg}`)
        }
    },

    set_log_function: log_function => {
        logger.out_func = (level, msg) => {
            log_function(level, msg)
        }
    },
}

module.exports = logger
