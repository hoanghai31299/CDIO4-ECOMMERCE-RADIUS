const { mongoose } = require(".");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      minlength: [3, "Category name have to greater than 3 character"],
      unique: [true, "category name is unique"],
    },
    deleteAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema, "categories");
