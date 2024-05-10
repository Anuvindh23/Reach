const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/reach');
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
console.error('MongoDB connection error:', err);
});
mongoose.connection.on('disconnected', () => {
console.log('Disconnected from MongoDB');
});
//for userData Collection
const userSchema = mongoose.Schema({
    userId: String,
    userName: String,
    phoneNumber: Number,
    mailAddress: String,
    password: String,
    deviceId: String,
    createdAt: { type: Number, default: Math.floor(new Date().getTime() / 1000), }
}, {versionKey: false});
const userModel = mongoose.model('UserData', userSchema, 'UserData');
// for otp collection
const otpLogsSchema = mongoose.Schema({
    mailAddress: String,
    otp: Number,
    createdAt: { type: Date, expires: 120, default: Date.now },
}, {versionKey: false});
const otpLogsModel = mongoose.model('OtpLogs', otpLogsSchema, 'OtpLogs');
module.exports = {
    userModel,
    otpLogsModel,
};