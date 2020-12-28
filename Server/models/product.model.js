const { mongoose } = require(".");
const { model } = require("./user.model");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name product is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, ' price product is required']
    },
    description: {
        type: {
            main: String,
            size: String,
            sku: String
        },
        required: [true, 'description product is required']
    },
    colors: {
        type: [{
            color: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Color"
            },
            image_url: String,
            quantity: Number
        }],
        required: [true, 'color product is required']
    },
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "categories product is required"]
    },
    deleteAt: {
        type: Date
    },
    sold: {
        type: Number,
        default: 0
    }

}, { timestamps: true });
productSchema.virtual("quantity")
    .get(function() {
        return this.colors.reduce((total, color) => {
            return total + color.quantity
        }, 0)
    })
    .set()

module.exports = mongoose.model("Product", productSchema, "products")