const { Types } = require("mongoose")
const { mongoose } = require(".")

const orderSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, 'address is required']
    },
    name: {
        type: String,
        required: [true, ' name is required'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'phone is required'],
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
            colorId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Color"
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
    lastTotal: {
        type: Number
    },
    deleteAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema, "orders")