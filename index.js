const express = require('express')

const app = express()

app.get('/', (requestObj, responseObj) =>{
    responseObj.send('Hey from the server!')
})

app.listen(3333)