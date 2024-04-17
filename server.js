const express = require('express')
const path = require('path')

const app = express()
const PORT = 3333
const api_routes = require('./routes/api_routes')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static('./public'))

app.use('/api', api_routes)

app.listen(PORT, () => {
    console.log('Server running on port: ', PORT)
})