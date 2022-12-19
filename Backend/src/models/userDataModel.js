const mongoose = require("mongoose")


const userDataSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model("UserData", userDataSchema);