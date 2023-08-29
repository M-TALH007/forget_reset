const mongoose = require("mongoose");

let userVerifySchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, index: true },
    password: String,
    roles: [],
    verified : Boolean
  },
  { timestamps: true }
);
const UserVerify = mongoose.model("UserVerify", userVerifySchema );
module.exports = UserVerify;
