const { mongoose } = require(".");

const colorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Color name is required"],
        unique: [true, "Color name is unique"]
    },
    hex: {
        type: String,
        required: [true, "color hex is required"],
        unique: [true, "Color hex is unique"],
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Color", colorSchema, "colors")