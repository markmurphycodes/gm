const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();

const userSchema = mongoose.Schema({
  alias: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  pub_key: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  time_created: {
    type: Date,
    default: Date.now,
  },
  time_expired: {
    type: Date,
    default: Date.now()
  }
});

// userSchema.pre("save", async function (next) {
//   let user = this;
//   if (user.isModified("password")) {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(user.password, salt);
//     user.password = hash;
//   }
//   next();
// });

userSchema.methods.generateToken = function () {
  let user = this;
  const userObj = { _id: user._id.toHexString(), pub_key: user.pub_key };
  const token = jwt.sign(userObj, process.env.DB_SECRET, { expiresIn: "1d" });
  return token;
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  const match = await bcrypt.compare(candidatePassword, user.password);
  return match;
};

userSchema.statics.aliasTaken = async function (alias) {
  const user = await this.findOne({ alias });
  return !!user;
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
