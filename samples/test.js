const tl = require('../index.js')
const m = require('moment')

console.log("------------------")

tl.log(tl.ERROR, "something bad happened")

function bla() {
    tl.log(tl.ERROR, "inside bla: something bad happened")
    ble()
}

function ble() {
    tl.log(tl.ERROR, "inside ble: something bad happened")
    bli()
}

function bli() {
    tl.log(tl.ERROR, "inside bli: something bad happened")
}

bla()

console.log("------------------")

tl.set_log_function((level, msg) => {
    console.log(`Some blabla ${m().format("YYYY-MM-DD HH:mm:ss.SSS")} ${level} ${msg}`)
})

tl.log(tl.ERROR, "something bad happened")

bla()


