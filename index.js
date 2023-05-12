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

const tracing_log = {
    ERROR: ERROR,
    WARN: WARN,
    INFO: INFO,
    DEBUG: DEBUG,

    level: 7,

    levels: levels,

    out_func: (level, msg) => {
        console.log(`${m().format("YYYY-MM-DD HH:mm:ss.SSS")} ${tracing_log.levels[level]} ${msg}`)
    },

    /*
    log: (level, msg) => {
        if(level <= trancing_log.level) {
            const trace = gen_trace(2)
            tracing_log.out_func(level, `${trace} ${msg}`)
        }
    },
    */

    set_log_function: log_function => {
        tracing_log.out_func = (level, msg) => {
            log_function(level, msg)
        }
    },

    gen_logger: id => {
        return {
            error: (msg) => {
                if(ERROR <= tracing_log.level) {
                    const trace = gen_trace(2)
                    tracing_log.out_func(ERROR, `${trace} ${id} ${msg}`)
                }
            },

            warn: (msg) => {
                if(WARN <= tracing_log.level) {
                    const trace = gen_trace(2)
                    tracing_log.out_func(WARN, `${trace} ${id} ${msg}`)
                }
            },

            info: (msg) => {
                if(INFO <= tracing_log.level) {
                    const trace = gen_trace(2)
                    tracing_log.out_func(INFO, `${trace} ${id} ${msg}`)
                }
            },

            debug: (msg) => {
                if(DEBUG <= tracing_log.level) {
                    const trace = gen_trace(2)
                    tracing_log.out_func(DEBUG, `${trace} ${id} ${msg}`)
                }
            },
        }
    },
}

module.exports = tracing_log
