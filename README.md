#sa-module-xlsx-generator

The module generates xls files.

##Init options
none

##Listening to events

- ###generate/file/xlsx

Trigger event `data` fields:

| Name       | Type       | Description
|------------|------------|-------------
| id         | `String`   | event id
| content    | `Object`   | target file content
| outputMode | `String`   | output data format

####content
```js
{
  sheets: [
    {
      name: "Sheet1",
      data: [
        [ "data1", 123, new Date ], // sheet row
        [ "data2", 456, new Date ],
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

- ###generated/file/xlsx
