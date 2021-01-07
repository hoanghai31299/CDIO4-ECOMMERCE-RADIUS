const { mongoose } = require(".");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, " name user is required"],
        trim: true,
        maxlength: 30
    },
    email: {
        type: String,
        required: [true, "email user is required"],
        lowercase: true,
        trim: true,
        unique: [true, "email is unique"]
    },
    phone: {
        type: String,
        maxlength: 10,
        minlength: 10,
        trim: true
    },
    address: {
        type: String,
        maxlength: 200
    },
    role: {
        type: Number,
        enum: [0, 1, 2],
        default: 0
    },
    password: {
        type: String,
        required: [true, ' password user is required'],

    },
    wishList: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Product"
        }],
        default: []
    },
    cart: {
        type: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            colorId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Color"
            },
            quantity: Number,
        }],
        default: []
    },
    deleteAt: {
        type: Date
    }
}, { timestamps: true })

// userSchema.pre("save", () => {
//     const salt = bcrypt.genSaltSync(10);
//     console.log(this);
//     this.password = bcrypt.hashSync(this.password, salt);

// })
// userSchema.methods = {
//     authenticate: function(plainText) {
//         return bcrypt.compareSync(plainText, this.password);
//     }
// };

module.exports = mongoose.model("User", userSchema, "users");