# tracing-log
A simple tracing log to be used in my nodejs modules. It will include file_name:line_number:function_name in each log line.
```
npm install tracing-log
```

## Usage:

Logging:
```
const tl = require('../index.js')
tl.log(tl.ERROR, "something bad happened")
```

Setting log level:
```
tl.level = tl.INFO
```

Setting a custom logging function:
```
tl.set_log_function((level, msg) => {
   console.log(`${m().format("HH:mm:ss.SSS")} ${level} ${msg}`)
})
``` 

## Sample usage
```
takeshi:tracing-log$ nl -b a samples/test.js 
     1  const tl = require('../index.js')
     2  const m = require('moment')
     3
     4  console.log("------------------")
     5
     6  tl.log(tl.ERROR, "something bad happened")
     7
     8  function bla() {
     9      tl.log(tl.ERROR, "inside bla: something bad happened")
    10      ble()
    11  }
    12
    13  function ble() {
    14      tl.log(tl.ERROR, "inside ble: something bad happened")
    15      bli()
    16  }
    17
    18  function bli() {
    19      tl.log(tl.ERROR, "inside bli: something bad happened")
    20  }
    21
    22  bla()
    23
    24  console.log("------------------")
    25
    26  tl.set_log_function((level, msg) => {
    27      console.log(`Some blabla ${m().format("YYYY-MM-DD HH:mm:ss.SSS")} ${level} ${msg}`)
    28  })
    29
    30  tl.log(tl.ERROR, "something bad happened")
    31
    32  bla()
    33
    34

takeshi:tracing-log$ node samples/test.js 
------------------
2021-10-03 12:38:07.779 ERROR test.js:6:null: something bad happened
2021-10-03 12:38:07.780 ERROR test.js:9:bla: inside bla: something bad happened
2021-10-03 12:38:07.780 ERROR test.js:14:ble: inside ble: something bad happened
2021-10-03 12:38:07.781 ERROR test.js:19:bli: inside bli: something bad happened
------------------
Some blabla 2021-10-03 12:38:07.781 3 test.js:30:null something bad happened
Some blabla 2021-10-03 12:38:07.781 3 test.js:9:bla inside bla: something bad happened
Some blabla 2021-10-03 12:38:07.781 3 test.js:14:ble inside ble: something bad happened
Some blabla 2021-10-03 12:38:07.781 3 test.js:19:bli inside bli: something bad happened
```
