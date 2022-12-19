const express = require('express')
const router = express.Router()
const { createUser, addTopic, getTopicData } = require("../controllers/user")




router.post("/createUser", createUser)


router.post("/addTopic", addTopic )


router.get("/dashboard/:userId", getTopicData )




module.exports = router