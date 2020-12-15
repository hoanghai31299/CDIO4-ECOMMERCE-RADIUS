const { SchemaType, SchemaTypes, Schema } = require("mongoose");
const { mongoose } = require(".");

const couponShemma = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    begin: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    discount: {
        type: mongoose.Decimal128,
        required: true
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

export default mongoose.model("Coupon", couponShemma, "coupons");