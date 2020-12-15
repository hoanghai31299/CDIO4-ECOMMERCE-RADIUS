const { Schema } = require("mongoose");
const { mongoose } = require(".");

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    information: {
        type: String,
        required: true
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

export default mongoose.model("Notification", notificationSchema, "notification")