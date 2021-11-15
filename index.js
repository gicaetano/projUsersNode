require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose') 
const app = express()

// =========== Middleawe ===========
app.use(
    express.urlencoded({
        extend: true,
    }),
)

app.use(express.json())

// Rotas API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// =========== Route / endpoints ===========
app.get('/', (req, res) => {

    
    res.json({ message: 'Hello Express' })
})

// =========== Port ===========
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.wfvl2.mongodb.net/bancodaapi?retryWrites=true&w=majority`
    )
.then(() => {
    console.log("Conectado ao Mongo DB!")
    app.listen(3000)
})
.catch((err) => {console.log(err)})
