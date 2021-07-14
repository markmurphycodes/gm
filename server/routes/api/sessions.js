const express = require("express");
let router = express.Router();
require("dotenv").config();
const { checkLoggedIn } = require("../../middleware/auth");
const { grantAccess } = require("../../middleware/roles");

// model
const { Session } = require("../../models/session_model");

router.route("/register").post(async (req, res) => {
  try {
    ///1 check if session is OK
    //if (await Session.sessionExists(req.body._id)) {
    //  return res.status(400).json({ message: "Error" });
    //}

    /// Create the session
    const session = new Session({
      alias: req.body.alias,
      pub_key: req.body.pub_key,
    });

    /// 3 generate token
    const token = session.generateToken();
    const doc = await session.save();

    // save...send token with cookie
    res.cookie("x-access-token", token).status(200).send(getSessionProps(doc));
  } catch (error) {
    res.status(400).json({ 
        route: "server/routes/api/sessions.js", 
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
  .get(checkLoggedIn, grantAccess("readOwn", "profile"), async (req, res) => {
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
    checkLoggedIn,
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
    checkLoggedIn,
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

router.route("/is_auth").get(checkLoggedIn, async (req, res) => {
  res.status(200).send(getUserProps(req.user));
});

const getUserProps = (user) => {
  return {
    _id: user._id,
    alias: user.alias
  };
};

module.exports = router;
