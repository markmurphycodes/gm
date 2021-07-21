const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();

const sessionSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  alias: {
    type: String,
  },
  signed_message: {
    type: String,
    required: true,
  },
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
  session_length: {
    type: Number,
    required: true
  },
  time_created: {
    type: Date,
    default: Date.now(),
  },
  time_expired: {
    type: Date,
    default: Date.now()
  },
  session_pubKey: {
    type: String,
    required: true
  },
  session_privKey: {
    type: String,
    required: true
  },
});

sessionSchema.statics.sessionExists = async function (id) {
  const session = await this.findOne({ id });
  return !!session;
};


// TODO make sure this token is ok to have and if it is, expire it in a timely manner
sessionSchema.methods.generateToken = function () {
  let session = this;
  const tte = this.session_length;
  const sessionObj = { _id: session._id.toHexString(), pub_key: session.session_pubKey };
  const token = jwt.sign(sessionObj, process.env.DB_SECRET, { expiresIn: `${tte}m` });
  return token;
};

const Session = mongoose.model("Session", sessionSchema);
module.exports = { Session };
