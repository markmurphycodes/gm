const express = require("express");
let router = express.Router();
require("dotenv").config();
const { verifyUserSignature } = require("../../middleware/auth");
const { grantAccess } = require("../../middleware/roles");
const nacl = require("tweetnacl");
const util = require("tweetnacl-util");

// model
const { Session } = require("../../models/session_model");

router.route("/register").post(async (req, res) => {
  try {
    ///1 check if session is OK
    //if (await Session.sessionExists(req.body._id)) {
    //  return res.status(400).json({ message: "Error" });
    //}

    
    const keysUnsigned = nacl.sign.keyPair();
    
    const uint8pub = util.decodeUTF8(JSON.stringify(keysUnsigned.publicKey));
    const uint8priv = util.decodeUTF8(JSON.stringify(keysUnsigned.secretKey));
    

    /// Create the session
    const session = new Session({
      owner: req.body.owner,
      alias: req.body.alias,
      signed_message: req.body.signed_message,
      session_length: req.body.session_length,
      session_type: req.body.session_type,
      session_pubKey: util.encodeBase64(uint8pub),
      session_privKey: util.encodeBase64(uint8priv)
    })

    // Generate token
    const token = session.generateToken();

    // Filter out fields that don't need to go to Redux
    const doc = await session.save();

    // save...send token with cookie
    res.cookie("x-access-token", token).status(200).send(getSessionProps(doc));
  } catch (error) {
    res.status(400).json({ 
        route: "server/routes/api/sessions.js {REGISTER}", 
        message: "Error", 
        error: error });
  }
});

router.route("/signin").post(async (req, res) => {
  try {
    // FIND USER
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "Bad email" });

    /// COMPARE PASSWORD
    const compare = await user.comparePassword(req.body.password);
    if (!compare) return res.status(400).json({ message: "Bad password" });

    // GENERATE TOKEN
    const token = user.generateToken();

    //RESPONSE
    res.cookie("x-access-token", token).status(200).send(getUserProps(user));
  } catch (error) {
    res.status(400).json({ message: "Error", error: error });
  }
});

router
  .route("/profile")
  .get(verifyUserSignature, grantAccess("readOwn", "profile"), async (req, res) => {
    try {
      const permission = res.locals.permission;
      const user = await User.findById(req.user._id);
      if (!user) return res.status(400).json({ message: "User not found" });

      res.status(200).json(permission.filter(user._doc));
    } catch (error) {
      return res.status(400).send(error);
    }
  })
  .patch(
    verifyUserSignature,
    grantAccess("updateOwn", "profile"),
    async (req, res) => {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $set: {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              age: req.body.age,
            },
          },
          { new: true }
        );
        if (!user) return res.status(400).json({ message: "User not found" });

        res.status(200).json(getUserProps(user));
      } catch (error) {
        res.status(400).json({ message: "Problem updating", error: error });
      }
    }
  );

router
  .route("/update_email")
  .patch(
    verifyUserSignature,
    grantAccess("updateOwn", "profile"),
    async (req, res) => {
      try {
        /// make
        if (await User.emailTaken(req.body.newemail)) {
          return res.status(400).json({ message: "Sorry email taken" });
        }

        const user = await User.findOneAndUpdate(
          { _id: req.user._id, email: req.body.email },
          {
            $set: {
              email: req.body.newemail,
            },
          },
          { new: true }
        );
        if (!user) return res.status(400).json({ message: "User not found" });

        const token = user.generateToken();
        res
          .cookie("x-access-token", token)
          .status(200)
          .send({ email: user.email });
      } catch (error) {
        res.status(400).json({ message: "Problem updating", error: error });
      }
    }
  );

router.route("/is_auth").get(verifyUserSignature, async (req, res) => {
  res.status(200).send(getUserProps(req.user));
});

const getUserProps = (user) => {
  return {
    _id: user._id,
    alias: user.alias
  };
};

module.exports = router;
