const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();

const sessionSchema = mongoose.Schema({
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  type: {
    type: String,
    enum: ["exclusive", "inclusive"],
    required: true,
    default: "exclusive",
  },
  assets: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assets"
  },
  time_created: {
    type: Date,
    default: Date.now(),
  },
  time_expired: {
    type: Date,
    default: Date.now()
  }
});

sessionSchema.statics.sessionExists = async function (id) {
  const session = await this.findOne({ id });
  return !!session;
};

sessionSchema.pre("save", async function(next) {
  console.log(mongoose.connection.readyState)
})

// TODO make sure this token is ok to have and if it is, expire it in a timely manner
sessionSchema.methods.generateToken = function () {
  let user = this;
  const sessionObj = { _id: user._id.toHexString(), pub_key: user.pub_key };
  const token = jwt.sign(sessionObj, process.env.DB_SECRET, { expiresIn: "1d" });
  return token;
};

const Session = mongoose.model("Session", sessionSchema);
module.exports = { Session };
