const { User } = require("../models/user_model");
const { Session } = require("../models/session_model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nacl = require("tweetnacl");
const util = require("tweetnacl-util");

exports.checkToken = async (req, res, next) => {
  try {
    if (req.headers["x-access-token"]) {
      // verify token
      const accessToken = req.headers["x-access-token"];
      const { _id } = jwt.verify(
        accessToken,
        process.env.DB_SECRET
      );

      res.locals.sessionData = await User.findById(_id);
      next();
    } else {
      next();
    }
  } catch (error) {
    return res.status(401).json({ error: "Bad token", errors: error });
  }
};


exports.verifyUserSignature = (message, publicKey, sessionId) => {

  const session = res.locals.sessionData;
  if (!session) return res.status(401).json({ error: "No session found. Please log in" });

  uintMsg = util.encodeUTF8(util.decodeBase64(message));
  const verified = nacl.sign.open(message, publicKey);

  if(verified){


  }
  else{
      return null;
  }
};
