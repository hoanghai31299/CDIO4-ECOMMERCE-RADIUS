const { SchemaType, SchemaTypes, Schema } = require("mongoose");
const { mongoose } = require(".");

const couponShemma = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title coupon is required']
    },
    description: {
        type: String,
        required: [true, 'description coupon is required']
    },
    code: {
        type: String,
        required: [true, 'code coupon is required']
    },
    begin: {
        type: Date,
        required: [true, 'begin date coupon is required']
    },
    end: {
        type: Date,
        required: [true, 'end date coupon is required']
    },
    discount: {
        type: mongoose.Decimal128,
        required: [true, 'discount coupon is required']
    },
    products: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Product"
        }],
        default: []
    },
    deleteAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("Coupon", couponShemma, "coupons");