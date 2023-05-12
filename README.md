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

// create a log object
const log = tl.gen_logger("some_identifier")


// use log functions:

log.error("some error msg")
log.warn("some warn msg")
log.info("some info msg")
log.debug("some debug msg")

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
$ nl -b a test.js
     1
     2  const tl = require('./index.js')
     3  const m = require('moment')
     4
     5  console.log("------------------")
     6
     7  const log = tl.gen_logger("steam_engine")
     8
     9  log.error("<error> something bad happened")
    10
    11  function bla() {
    12      log.warn("<warn> inside bla: something bad happened")
    13      ble()
    14  }
    15
    16  function ble() {
    17      log.info("<info> inside ble: something bad happened")
    18      bli()
    19  }
    20
    21  function bli() {
    22      log.debug("<debug> inside bli: something bad happened")
    23  }
    24
    25  bla()
    26
    27  console.log("------------------")
    28
    29  tl.set_log_function((level, msg) => {
    30      console.log(`Some_blabla_prefix ${m().format("YYYY-MM-DD HH:mm:ss.SSS")} ${tl.levels[level]} ${msg}`)
    31  })
    32
    33  log.error("<error> something bad happened")
    34
    35  bla()
    36


$ node test.js 
------------------
2023-05-12 17:50:42.952 ERROR test.js:9:null steam_engine <error> something bad happened
2023-05-12 17:50:42.954 WARN test.js:12:bla steam_engine <warn> inside bla: something bad happened
2023-05-12 17:50:42.954 INFO test.js:17:ble steam_engine <info> inside ble: something bad happened
2023-05-12 17:50:42.955 DEBUG test.js:22:bli steam_engine <debug> inside bli: something bad happened
------------------
Some_blabla_prefix 2023-05-12 17:50:42.955 ERROR test.js:33:null steam_engine <error> something bad happened
Some_blabla_prefix 2023-05-12 17:50:42.955 WARN test.js:12:bla steam_engine <warn> inside bla: something bad happened
Some_blabla_prefix 2023-05-12 17:50:42.955 INFO test.js:17:ble steam_engine <info> inside ble: something bad happened
Some_blabla_prefix 2023-05-12 17:50:42.955 DEBUG test.js:22:bli steam_engine <debug> inside bli: something bad happened

```
