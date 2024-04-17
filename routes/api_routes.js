const router = require('express').Router()
// const data = require('../db/users')
const { v4: generateId } = require('uuid')
const fs = require('fs/promises')

async function getData(){
    const data = await fs.readFile('./db/users.json', 'utf8')
    return JSON.parse(data)
}



router.get('/users', async (requestObj, responseObj) => {
    const name = requestObj.query.name?.toLowerCase()
    const data = await getData()
    if (name) {
        return responseObj.json(data.find(obj => obj.name.toLowerCase() === name) || { message: 'no such user' })
    }
    return responseObj.json(data)
})

router.get('/users/:user_id', async (requestObj, responseObj) => {

    const data = await getData()
    let id = requestObj.params.user_id
    responseObj.json(data.find(obj => obj.id == id) || { message: 'no such user' })
})

router.post('/users/form', async (requestObj, responseObj) => {
    console.log(requestObj.body)
    responseObj.json({ message: "Recieved" })
})

router.post('/users', async (requestObj, responseObj) => {
    console.log(requestObj.body)
    const data = await getData()
    data.push({
        ...requestObj.body,
        id: generateId()
    })
    await fs.writeFile('./db/users.json',JSON.stringify(data,null,2))

    responseObj.json({ message: "Recieved" })
})

router.delete('/users/:user_id', async (requestObj, responseObj) => {

    const data = await getData()
    let id = requestObj.params.user_id
    const filtered = data.filter(obj => obj.id !== id)
    await fs.writeFile('./db/users.json',JSON.stringify(filtered,null,2))

    responseObj.json({ message: "Deleted" })


})



module.exports = router
