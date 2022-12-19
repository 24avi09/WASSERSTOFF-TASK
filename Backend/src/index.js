const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const route = require('./routes/route')
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}


app.use(bodyparser.json())

app.use(cors(corsOptions))


mongoose.connect('mongodb+srv://abhi03:UQkqPECmlouMcNjb@cluster1.kwsn7az.mongodb.net/merntask', {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', route)

app.use((req, res) => {
    const error = new Error('Path not found')
    return res.status(400).send({ status: 'Error', error: error.message })
})


app.listen(3001, function () {
    console.log('Express is running on port 3001')
})