const express = require('express')

const app = express()
const PORT = 3333

const data = [
    {
        id: 1,
        name: 'Will',
        age: 34
    },
    {
        id: 2,
        name: 'Bill',
        age: 34
    },
    {
        id: 3,
        name: 'William',
        age: 34
    },
    {
        id: 4,
        name: 'JD',
        age: 44
    }

]

app.get('/', (requestObj, responseObj) => {
    responseObj.send('Hey from the server!')
})

app.get('/about', (requestObj, responseObj) => {
    responseObj.send('<h1>about</h1>')
})

app.get('/data', (requestObj, responseObj) => {
    const queryParams = requestObj.query
    console.log(queryParams)

    const obj = {}

    if (queryParams.name === 'true') {
        obj.name = 'Will'
    }
    if (queryParams.age === 'true') {
        obj.age = 34
    }

    responseObj.json(obj)
})

app.get('/api/:user_id', (requestObj, responseObj) => {
    responseObj.json(data.find(item => item.id == requestObj.params.user_id))
})

app.listen(PORT, () => {
    console.log('Server running on port: ', PORT)
})