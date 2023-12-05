require("dotenv").config();
const config = require('./config/index')
const mongoose = require('mongoose')
const express = require("express");
const app = express();

if (require.main === module) {
    app.listen(config.port, ()=>{
        console.log('listning', config.port);
    })
    mongoose.connect(config.db.url)
    mongoose.connection.on('error', console.log)
}

// link all routes
require("./routes/index.js")(app);

// console.log(process.env.JWT_SECRET_KEY);
