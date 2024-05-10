const express = require("express");
const router = express.Router();
const {
    loginWithCredentials,
} = require("./login");

router.post("/loginWithCredentials", loginWithCredentials);

module.exports = router;
