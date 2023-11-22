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


// landing page -Sign Up - DONE // 
app.get('/', function (req,res) {
    res.render('index');

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



// admin privilege //
// page - admin post //
app.get('/createpost', function (req,res) {
    res.send("Create Post - Admins Only");
    console.log("Create Post Page Loaded")
});


// admin staff dashboard DONE //
app.get('/admin-staff', function (req,res) {
    res.render('admin_staff');
    console.log("Admin Staff PageLoaded")
});

// admin privilege - DONE //
// admin - update child // 
app.get('/admin-child', function (req,res) {
    res.render('admin_child');
    console.log("Admin Child Page Loaded")
});


// sign up privileges  DONE//
// account type // 
app.get('/account-type', function (req,res) {
    res.render('privileges');
    console.log("Choose Privileges Page Loaded")
});

// all account login page DONE//
app.get('/login-page', function (req,res) {
    res.render('login_page');
    console.log("Login Page Loaded")
});



// make a comment on a post // 
app.get('/postcomment', function (req,res) {
    res.send("Posts - Comment Page");
    console.log("Comment Page Loaded")
});


// admin - create staff  DONE // 
app.get('/add-staff', function (req,res) {
    res.render("add_staff");
    console.log("Create Staff Page Loaded")
});

// admin - create child  DONE // 
app.get('/add-child', function (req,res) {
    res.render("add_child");
    console.log("Create Child Page Loaded")
});


// admin - update child  DONE// 
app.get('/update-child', function (req,res) {
    res.render('update_child');
    console.log("Update Child Page Loaded")
});


// admin - update staff  DONE// 
app.get('/update-staff', function (req,res) {
    res.render('update_staff');
    console.log("Update Child Page Loaded")
});




app.listen(1616, function () {
    console.log(`Server is running on http://localhost:${PORT}`);
});

