const { mongoFindOne, mongoUpdateOne } = require("../dbOperations/mongoDB");
const { userModel } = require("../dbOperations/schema");
const bcrypt = require("bcrypt");

const loginWithCredentials = async (req, res) => {
  let status;
  try {
    const { mailAddress, phoneNumber, password, deviceId } = req.body;
    if (!mailAddress || !phoneNumber || !password || !deviceId) {
      throw new Error("Missing required parameters.");
    }
    const userDoc = await mongoFindOne(
      userModel,
      { $or: [{ mailAddress }, { phoneNumber }] },
      { _id: 0, createdAt: 0 }
    );
    if (!userDoc) {
      status = {
        status: "success",
        userVerified: false,
        reason: "USER NOT FOUND",
      };
    } else {
      status = {
        status: "success",
      };
      if (userDoc.mailAddress !== mailAddress) {
        status.userVerified = false;
        status.reason = "The mail address you entered is incorrect";
      } else if (userDoc.phoneNumber !== phoneNumber) {
        status.userVerified = false;
        status.reason = "The phone number you entered is incorrect";
      } else {
        const passwordMatch = await bcrypt.compare(password, userDoc.password);
        if (passwordMatch) {
          await mongoUpdateOne(
            userModel,
            { phoneNumber, mailAddress },
            { deviceId }
          );
          status.userVerified = passwordMatch;
          status.loginData = {
            userId: userDoc.userId,
            userName: userDoc.userName,
            mailAddress: userDoc.mailAddress,
            deviceId,
            phoneNumber: userDoc.phoneNumber,
          };
        } else {
          status.userVerified = false;
          status.reason = "The password you entered is incorrect";
        }
      }
    }
  } catch (err) {
    status = {
      status: "error",
      message: err.message,
    };
  }
  res.json(status);
};

module.exports = {
  loginWithCredentials,
};
