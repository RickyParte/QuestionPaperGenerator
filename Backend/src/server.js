const express = require('express');
const dotenv = require('dotenv').config();
const questionRoute = require('./routes/questions.route');
const qpGeneratorRoute = require('./routes/questionpapergenerate.route');
const DBconnection = require("./config/DBconfig")
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/questionstore', questionRoute);
app.use('/api/generateqp', qpGeneratorRoute);

DBconnection();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`);
});

