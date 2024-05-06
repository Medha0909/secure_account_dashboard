const express = require("express");
const router = express.Router();
const { sendOTP, verifyOTP } = require("./otpcontroller");

router.post("/verify", async (req, res) => {
  try {
    let { email, otp } = req.body;

    const validOTP = await verifyOTP({ email, otp });
    res.status(200).json(validOTP );
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//request new varificatio otp
router.post("/otp", async (req, res) => {
  const { email } = req.body;
  try {
    const createdOTP = await sendOTP({
      email
    });
    res.status(200).json(createdOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
