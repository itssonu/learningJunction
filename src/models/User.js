const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name required"],
    },
    lastName: String,
    email: {
      type: String,
      unique: true,
    },
    emailVerifiedAt: {
      type: Number,
      default: "",
    },
    // number: {
    //   type: String,
    //   unique: true,
    // },
    // numberVerifiedAt: {
    //   type: Number,
    //   default: "",
    // },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret, options) {
        if (!options?.showPassword ?? true) delete ret.password;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("User", userSchema);
