const mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, index: true },
    password: String,
    roles: [],
    isVerified : {
      type : Boolean,
      default : false
    },
    token:{
      type: String,
      default:"",
    }
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
