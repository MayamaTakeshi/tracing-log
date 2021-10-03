const tl = require('../index.js')
const m = require('moment')

console.log("------------------")

tl.log(tl.ERROR, "<error> something bad happened")

function bla() {
    tl.log(tl.WARN, "<warn> inside bla: something bad happened")
    ble()
}

function ble() {
    tl.log(tl.INFO, "<info> inside ble: something bad happened")
    bli()
}

function bli() {
    tl.log(tl.DEBUG, "<debug> inside bli: something bad happened")
}

bla()

console.log("------------------")

tl.set_log_function((level, msg) => {
    console.log(`Some_blabla_prefix ${m().format("YYYY-MM-DD HH:mm:ss.SSS")} ${tl.levels[level]} ${msg}`)
})

tl.log(tl.ERROR, "<error> something bad happened")

bla()


