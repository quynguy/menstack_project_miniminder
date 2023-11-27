const express = require('express');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection');

// initialize express app // 
const app = express();
const dotenv = require('dotenv');
const Staffdb = require('./server/model/staff_model');

dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 1616 

// log requests //
app.use(morgan('tiny'));

// mongodb connection //
connectDB();

// parse requests to body-parser // 
app.use(bodyparser.urlencoded({ extended: false }));

// set view engine //
app.set("view engine", "ejs");

// get method: staffschema from mongodb to html
app.get('/admin-staff', async (req, res) => {
    const staffs = await Staffdb.find({});
    res.render('admin_staff', {
         staffList: staffs
    });
 });

// load assets //
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
// css/style.css // 

app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));



// load routers 
app.use('/', require('./server/routes/router'));

app.listen(1616, function () {
    console.log(`Server is running on http://localhost:${PORT}`);
});

