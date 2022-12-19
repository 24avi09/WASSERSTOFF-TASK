const mongoose = require("mongoose")


const addTopicSchema = new mongoose.Schema({


    heading: {
        type: String,
        required: true,
        trim: true
    },
    percentage: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    }

}, { timestamps: true });

module.exports = mongoose.model("addTopic", addTopicSchema);