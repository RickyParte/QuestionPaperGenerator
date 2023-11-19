const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const DBconnection = () => {
    try {
        mongoose.connect(process.env.DB_URL)
            .then(() => {
                console.log('Connected to MongoDB URL',process.env.DB_URL);
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB:', error.message);
            });
    }
    catch (error) {
        console.log("DB Connection Failed.. Please Verify")
    }

}

module.exports = DBconnection;