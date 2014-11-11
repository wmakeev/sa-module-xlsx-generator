#sa-module-xlsx-generator

scaleApp node.js module for generating xlsx files.

##Example
```js
var fs       = require('fs');
var encoding = require('encoding');

var sa       = require('scaleapp');
var Sandbox  = require('sa-sandbox').Sandbox;
var core     = new sa.Core(Sandbox);

var xlsGenerator = require('sa-module-xlsx-generator');
core.register('xslGenerator', xlsGenerator);

core.start(function() {
    var workbook = {
        sheets: [
            { rows: [
                [ "id", "name", "type" ],
                [ "123", "Sun", "star" ]
            ] }
        ] };

    core.on('generated/file/xlsx', function (data, channel, next) {
        var buffer_1251 = encoding.convert(data.buffer, 'win1251');
        fs.writeFile('path/to/file.xlsx', buffer_1251, next);
    });

    core.emit('generate/file/xlsx', { workbook: workbook }, function (err) {
        if (err) {
            console.log('App error: ' + err.message);
            throw err;
        }
    });
});


```

##Initial options
none

##Listening to events

###generate/file/xlsx

event `e` fields:

| name       | type       | optional | description |
|------------|------------|------------------------
| _eventId    | `String`   | true     | some Id to track  result event |
| _version    | `String`  | true     | version of event interface (equal to generator version) |
| workbook   | `Object`   | false    | workbook data |

Sample **workbook** data for xlsx file generation
```js
{
    name: 'SampleWorkbook',
    sheets: [
        {
            name: "Sheet1",
            rows: [
                // sample sheet rows
                [ "data1", 123, new Date("2014-02-19T14:30Z"), true ],
                [ "data2", "0.456", new Date(), null, false ],
                ...
            ]
        },
        {
            name: "sheet2"
            ...
        }
    ]
}
```

##Emits

###generated/file/xlsx

Result emmited event fields:

| name       | type       | optional | description
|------------|------------|------------------------
| _srcEventId | `String`   | true     | equal to `e.eventId`
| _version    | `String`  | true     | version of result object interface
| workbook   | `Object`   | false    | link to `e.workbook` data object
| buffer     | `Buffer`   | false    | result file contents as buffer
