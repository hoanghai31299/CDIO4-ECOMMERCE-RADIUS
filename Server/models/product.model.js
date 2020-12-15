const { mongoose } = require(".");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: {
            main: String,
            size: String,
            sku: String
        },
        required: true
    },
    colors: {
        type: [{
            color: String,
            hex: {
                type: String,
                maxlength: 6,
                minlength: 6
            },
            image_url: String,
            quantity: Number
        }],
        required: true
    },
    categories: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories"
        }]
    },
    deleteAt: {
        type: Date
    }

}, { timestamps: true });
productSchema.virtual("quantity")
    .get(function() {
        return this.colors.reduce((total, color) => {
            return total + color.quantity
        }, 0)
    })
    .set()

export default mongoose.model("Product", productSchema, "products")