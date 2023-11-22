const express = require('express');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

// initialize express app // 
const app = express();
const dotenv = require('dotenv');

dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 1616 

// log requests //
app.use(morgan('tiny'));

// parse requests to body-parser // 
app.use(bodyparser.urlencoded({ extended: true }));

// load assets //
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
// css/style.css // 

app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));




// set view engine //
app.set("view engine", "ejs");


// landing page // 
app.get('/', function (req,res) {
    res.render('index');
    // renders individual html files - rendering index.ejs //
});

// home page // 
app.get('/home', function (req,res) {
    res.send("Home Page");
    console.log("Home Page Loaded")
});

// page - admin dashboard //
app.get('/admin', function (req,res) {
    res.send("Admin Page");
    console.log("Admin Page Only Loaded")
});

// page - parents dashboard //
app.get('/parents', function (req,res) {
    res.send("Parents Page");
    console.log("Parents Only Loaded")
});


// page - admin post //
// admin privilege //
app.get('/createpost', function (req,res) {
    res.send("Create Post - Admins Only");
    console.log("Create Post Page Loaded")
});



// make a comment on a post // 
app.get('/postcomment', function (req,res) {
    res.send("Posts - Comment Page");
    console.log("Comment Page Loaded")
});


// admin - create staff // 
app.get('/create-staff', function (req,res) {
    res.send("Create New Staff Profile");
    console.log("Create Staff Page Loaded")
});

// admin - create child // 
app.get('/create-child', function (req,res) {
    res.send("Create New Child Profile");
    console.log("Create Child Page Loaded")
});


// admin - update child // 
app.get('/update-child', function (req,res) {
    res.send("UpdateChild Profile");
    console.log("Update Child Page Loaded")
});





app.listen(1616, function () {
    console.log(`Server is running on http://localhost:${PORT}`);
});

