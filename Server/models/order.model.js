const { Types } = require("mongoose")
const { mongoose } = require(".")

const orderSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        maxlength: 10,
        minlength: 10
    },
    status: {
        type: Number,
        enum: [0, 1, 2, 3],
        default: 0
    },
    products: {
        type: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: Number
        }],
        required: true
    },
    coupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    shipDate: {
        type: Date
    },
    total: {
        type: Number
    },
    lassTotal: {
        type: Number
    },
    deleteAt: {
        type: Date
    }

}, { timestamps: true });

export default mongoose.model("Order", orderSchema, "orders")