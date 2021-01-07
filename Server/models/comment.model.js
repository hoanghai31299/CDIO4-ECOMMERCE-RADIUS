const { mongoose } = require(".");

const commentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: [true, "user is required"]
    },
    rate: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: [true, "rate is is required"]
    },
    content: {
        type: String,
        required: [true, "content is required"]
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
}, { timestamps: true })

module.exports = mongoose.model("Comment", commentSchema, "comments")