const { Schema } = require("mongoose");
const { mongoose } = require(".");

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title notification is required']
    },
    information: {
        type: String,
        required: [true, ' information notification is required']
    },
    users: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        default: []
    },
    deleteAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema, "notification")