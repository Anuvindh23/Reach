
const { userModel, otpLogsModel } = require('../dbOperations/schema');
const { mongoFindOne, mongoInsertOne } = require('../dbOperations/mongoDB');
const { v4: uuidv4 } = require('uuid');
const OtpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const registerUser = async (req, res) => {
    let status;
    try {
        const { userName, phoneNumber, mailAddress, password, deviceId } = req.body;
        if (!userName || !phoneNumber || !mailAddress || !password || !deviceId) {
            throw new Error('One of the parameters is missing.');
        }
        userExistsResponse = await isUserAlreadyExists(mailAddress, phoneNumber)
        if(userExistsResponse.status === 'success' && userExistsResponse.userExists) {
            throw new Error('User Already Exists');
        }
        const userId = uuidv4();
        const saltRounds = 4;
        const encryptedPassword = await bcrypt.hash(password, saltRounds);
        const insertionDoc = { userId, userName, phoneNumber, mailAddress, password: encryptedPassword, deviceId};
        const insertionRes = await mongoInsertOne(userModel, insertionDoc);
        status = {
            status: 'success',
            userRegistered: insertionRes,
            userId,
        };
    } catch (e) {
        status = {
            status: 'error',
            message: e.message,
        };
    }
    res.json(status);
}
const checkUserExists = async (req, res) => {
    let status;
    let userExists = false;
    try {
        const { mailAddress, phoneNumber } = req.body;
        if(!mailAddress || !phoneNumber) {
            throw new Error('Missing required parameters.');
        }
        userExistsResponse = await isUserAlreadyExists(mailAddress, phoneNumber)
        if(userExistsResponse.status === 'success' && userExistsResponse.userExists) {
            userExists = 'USER ALREADY EXISTS';
        }
        status = {
            status: 'success',
            userExists,
        };
    } catch (err) {
        status = {
            status: 'error',
            message: err.message,
        };
    }
    res.json(status);
}
const isUserAlreadyExists = async (mailAddress, phoneNumber) => {
    let status;
    try {
        const user = await mongoFindOne(userModel, { $or: [ {mailAddress}, {phoneNumber} ] });
        status = {
            status: 'success',
            userExists: user ? true : false,
        }
    } catch (e) {
        status = {
            status: 'error',
            message: e.message,
        }
    }
    return status;
}
const generateOtpAndSendMail = (req, res) => {
    let status;
    try {
        const { mailAddress } = req.body;
        if (!mailAddress) {
            throw new Error('Missing required Parameter, Mail Address');
        }
        const generatedOtp = OtpGenerator.generate(4, {digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false});
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'reachByWalters@gmail.com',
                pass: 'nisg rjmr yxcw jrax',
            }
        });
        const mailOptions = {
            from: 'reachByWalters@gmail.com',
            to: mailAddress,
            subject: 'New Reach Account Verification',
            text: `
            Hi there,
            Welcome to Reach!
            Your new account registration OTP is: ${generatedOtp}
            Please use this code to verify your account and complete the registration process.
            If you did not request this OTP, please ignore this email.
            Thank you for using Reach!


            Best regards,
            The Reach Team`,
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                throw new Error(err);
            }
            const otpInsertionDoc = {
                mailAddress,
                otp: generatedOtp,
                createdAt: Math.floor(new Date().getTime() / 1000),
            }
            mongoInsertOne(otpLogsModel, otpInsertionDoc);
        });
        status = {
            status: 'success',
        };
    } catch (e) {
        status = {
            status: 'error',
            message: e.message,
        };
    }
    res.json(status);
}
const verifyOtp = async (req, res) => {
    let status;
    try {
        const { mailAddress, otp } = req.body;
        if(!mailAddress || !otp) {
            throw new Error('Missing one of the required paramters.');
        }
        const verifyOtpResponse = await mongoFindOne(otpLogsModel, { mailAddress, otp });
        status = {
            status: 'success',
            otpVerified: verifyOtpResponse ? true : false,
        };
    } catch (e) {
        status = {
            status: 'error',
            message: e.message,
        }
    }
    res.json(status);
}
module.exports = {
    registerUser,
    generateOtpAndSendMail,
    verifyOtp,
    checkUserExists,
}