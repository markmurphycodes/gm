const express = require("express");
let router = express.Router();
require("dotenv").config();
const { verifyUserSignature } = require("../../middleware/auth");
const { grantAccess } = require("../../middleware/roles");

// model
const { User } = require("../../models/user_model");

router.route("/register").post(async (req, res) => {
  try {

    const user = new User({
      alias: req.body.alias,
      pub_key: req.body.pub_key,
      role: req.body.role
    });

    const token = user.generateToken();
    const doc = await user.save();

    // No cookie for users, just fot the session
    res.status(200).send(getUserProps(doc));
  } catch (error) {
    res.status(400).json({ 
      route: "server/routes/api/users.js", 
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
    alias: user.alias,
  };
};

module.exports = router;
