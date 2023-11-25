const express = require('express');
const route = express.Router();


const services = require('../services/render');
const staffcontroller = require('../controller/staff_controller');


/* Root Route */ 
// landing page -Sign Up - DONE // 
route.get('/', services.homeRoutes);


// admin staff dashboard DONE //
route.get('/admin-staff', services.admin_staff);

// admin privilege - DONE //
// admin - update child // 
route.get('/admin-child', services.admin_child);


// sign up privileges  DONE//
// account type // 
route.get('/account-type', services.account_type);

// all account login page DONE//
route.get('/login-page', services.login_page);

// admin - create staff  DONE // 
route.get('/add-staff', services.add_staff);

// admin - update staff  DONE// 
route.get('/update-staff', services.update_staff);

// admin - create child  DONE // 
route.get('/add-child', services.add_child);

// admin - update child  DONE// 
route.get('/update-child', services.update_child);

// make a comment on a post //
route.get('/postcomment', function (req, res) {
    res.send("Posts - Comment Page");
    console.log("Comment Page Loaded")
});

// page - admin dashboard //
route.get('/admin', function (req, res) {
    res.send("Admin Page");
    console.log("Admin Page Only Loaded")
});

// page - parents dashboard //
route.get('/parents', function (req, res) {
    res.send("Parents Page");
    console.log("Parents Only Loaded")
});

// admin privilege //
// page - admin post //
route.get('/createpost', function (req, res) {
    res.send("Create Post - Admins Only");
    console.log("Create Post Page Loaded")
});



// API
route.post('/api/staffs', staffcontroller.create);
route.get('/api/staffs', staffcontroller.find);
route.put('/api/staffs/:id', staffcontroller.update);
route.delete('/api/staffs/:id', staffcontroller.delete);


module.exports = route;