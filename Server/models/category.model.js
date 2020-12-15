const { mongoose } = require(".")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    deleteAt: {
        type: Date
    }
}, { timestamps: true })

export default mongoose.model("Category", categorySchema, "categories");