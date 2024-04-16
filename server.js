const express = require('express')
const path = require('path')

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
app.use(express.static('./public'))

app.get('/api/users', (requestObj, responseObj) => {
    const name = requestObj.query.name.toLowerCase()
    if(name){
       return responseObj.json(data.find(obj => obj.name.toLowerCase() === name))
    }
   return responseObj.json(data)
})

app.get('/api/users/:user_id', (requestObj, responseObj) => {
    let id = requestObj.params.user_id
        responseObj.json(data.find(obj => obj.id == id)||{message: 'no such user'})
})

app.get('/api/users', (requestObj, responseObj) => {
    let name = requestObj.query.name
        responseObj.json(data.find(obj => obj.name == 'name')||{message: 'no such user'}) 
})


app.listen(PORT, () => {
    console.log('Server running on port: ', PORT)
})