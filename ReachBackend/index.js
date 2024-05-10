const express = require('express');
const cors = require('cors')
const app = express();
const commonEndpoint = require('./common/index.js');
const registerEndpoint = require('./register/index.js');
const loginEndpoint = require('./login/index.js');
const bodyParser = require('body-parser');

const corsOptions = {
  origin: '*',
  methods: ['POST'],
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/app', commonEndpoint);
app.use('/register', registerEndpoint);
app.use('/login', loginEndpoint);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});