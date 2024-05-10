const { userModel } = require('../dbOperations/schema');
const { mongoFindOne } = require('../dbOperations/mongoDB');

const checkDeviceEntry = (req, res) => {
    let status;
    try {
        const { deviceId } = req.body;
        const deviceIdResponse = mongoFindOne(userModel, {deviceId});
        console.log(deviceIdResponse);

        status = {
            status: 'success',
            deviceIdPresent: deviceIdResponse,
        };
    } catch (e) {
        status = {
            status: 'error',
            message: e.message,
        };
    }
    res.json(status);
}

module.exports = {
    checkDeviceEntry,
}