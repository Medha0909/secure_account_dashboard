const express = require("express");
const router = express.Router();
var fetchUser = require("../middleware/fetchUser");
const SignInUser = require("../models/signIn");


router.post("/logOut", async (req, res) => {
  try {
    const reqdeviceId=req.body.reqdeviceId;
    const user = await SignInUser.find({reqdeviceId});
    if (loggedIn){
      status="loggedOut";
    }
    res.status(200).json(createdOTP);

  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/getapi", async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await SignInUser.find({userId});
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});



module.exports = router;
