const userModel = require("../models/userModel")
const addTopicModel = require("../models/addTopicModel")





//////////////////////////////////////////////


const createUser = async (req, res) => {
    try {
        const data = req.body;
        let isUserExist = await userModel.findOne(data);
        if (isUserExist) {
            return res.status(200).send({ msg: "success", data: isUserExist })
        }
        const creatingUser = await userModel.create(data);

        return res.status(201).send({ msg: "success", data: creatingUser })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};


//////////////////////////////////////


const addTopic = async (req, res) => {
    try {
        const { userId, heading, blocks } = req.body;

        if (!userId) {

        }

        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].key === "UNDERSTOOD") {
                blocks[i].key = 4;
            } else if (blocks[i].key === "SOMEWHAT UNDERSTOOD") {
                blocks[i].key = 3;
            } else if (blocks[i].key === "NOT CLEAR") {
                blocks[i].key = 2;
            } else if (blocks[i].key === "WHAT RUBBISH") {
                blocks[i].key = 1;
            }
        }

        const value = blocks.length;

        let totalPoints = 0;
        blocks.map(block => {
            totalPoints += block.key;
        });

        var percentage = (totalPoints / (value * 4)) * 100;

        console.log({
            totalPoints: totalPoints,
            totalTextBlock: value,
            percentage: percentage
        });

        const createtopic = await addTopicModel.create(
            {
                userId: userId,
                heading: heading,
                percentage: `${percentage}%`
            }
        )

        return res.status(201).send({ msg: "success", data: createtopic })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};






//////////////////////////////////

const getTopicData = async (req, res) => {
    try {

        const findData = req.params;

        const allTopics = await addTopicModel.find(findData)

        return res.status(200).send({ msg: "success", data: allTopics })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { createUser, addTopic, getTopicData };