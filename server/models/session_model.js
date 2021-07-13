const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();

const sessionSchema = mongoose.Schema({
  users: {
    type: mongoose.Collection,
    required: true,
  },
  type: {
    type: String,
    enum: ["exclusive", "inclusive"],
    default: "exclusive",
  },
  assets: {
      type: mongoose.Collection,
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

userSchema.statics.sessionExists = async function (id) {
  const session = await this.findOne({ id });
  return !!session;
};

const Session = mongoose.model("Session", sessionSchema);
module.exports = { Session };
