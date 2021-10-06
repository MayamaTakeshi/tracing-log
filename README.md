# tracing-log
A simple tracing logger. 

It will include FILE_NAME:LINE_NUMBER:FUNCTION_NAME in each log line.
```
npm install tracing-log
```

## Usage:

Logging:
```
const tl = require('tracing-log')

// pass log level as parameter or use log level functions:

tl.log(tl.ERROR, "some error msg")
tl.log(tl.WARN, "some warn msg")
tl.log(tl.INFO, "some info msg")
tl.log(tl.DEBUG, "some debug msg")

tl.error("some error msg")
tl.warn("some warn msg")
tl.info("some info msg")
tl.debug("some debug msg")

```

Setting log level:
```
tl.level = tl.INFO
```

Setting a custom logging function:
```
tl.set_log_function((level, msg) => {
   console.log(`${m().format("HH:mm:ss.SSS")} ${tl.levels[level]} ${msg}`)
})
``` 

## Sample usage
```
takeshi:tracing-log$ nl -b a test.js
     1  const tl = require('tracing-log')
     2  const m = require('moment')
     3
     4  console.log("------------------")
     5
     6  tl.error("<error> something bad happened")
     7
     8  function bla() {
     9      tl.warn("<warn> inside bla: something bad happened")
    10      ble()
    11  }
    12
    13  function ble() {
    14      tl.info("<info> inside ble: something bad happened")
    15      bli()
    16  }
    17
    18  function bli() {
    19      tl.debug("<debug> inside bli: something bad happened")
    20  }
    21
    22  bla()
    23
    24  console.log("------------------")
    25
    26  tl.set_log_function((level, msg) => {
    27      console.log(`Some_blabla_prefix ${m().format("YYYY-MM-DD HH:mm:ss.SSS")} ${tl.levels[level]} ${msg}`)
    28  })
    29
    30  tl.error("<error> something bad happened")
    31
    32  bla()
takeshi:tracing-log$ node test.js
------------------
2021-10-03 14:36:57.216 ERROR test.js:6:null <error> something bad happened
2021-10-03 14:36:57.217 WARN test.js:9:bla <warn> inside bla: something bad happened
2021-10-03 14:36:57.217 INFO test.js:14:ble <info> inside ble: something bad happened
2021-10-03 14:36:57.217 DEBUG test.js:19:bli <debug> inside bli: something bad happened
------------------
Some_blabla_prefix 2021-10-03 14:36:57.218 ERROR test.js:30:null <error> something bad happened
Some_blabla_prefix 2021-10-03 14:36:57.218 WARN test.js:9:bla <warn> inside bla: something bad happened
Some_blabla_prefix 2021-10-03 14:36:57.218 INFO test.js:14:ble <info> inside ble: something bad happened
Some_blabla_prefix 2021-10-03 14:36:57.218 DEBUG test.js:19:bli <debug> inside bli: something bad happened
```
