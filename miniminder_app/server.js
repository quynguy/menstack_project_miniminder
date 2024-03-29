require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const connectDB = require('./server/database/connection');


// connect to MongoDB
connectDB();

const PORT = process.env.PORT || 1616 


// initialize express app // 
const app = express();
const dotenv = require('dotenv');
const Staffdb = require('./server/model/staff_model');
const ChildDb = require('./server/model/child_model');

// log requests //
app.use(morgan('tiny'));


// parse requests to body-parser // 
app.use(bodyparser.urlencoded({ extended: false }));

// set view engine //
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));


// static files from 'assets' directory 
app.use(express.static(path.join(__dirname, 'assets')));


// get method: staffschema from mongodb to html
app.get('/admin-staff', async (req, res) => {
    try {
        const staffs = await Staffdb.find({});
        console.log(staffs); 
        res.render('admin_staff', {
            staffList: staffs
        });
    } catch (error) {
        // Handle the error, e.g., send an error response
        res.status(500).send('Internal Server Error - Server.js Staff Admin');
    }
});

// post method: update for staff
app.post('/update-staff/:id', async (req, res) => {
    const { id } = req.params;
    const { newData } = req.body;

    try {
        const updatedStaff = await Staffdb.findByIdAndUpdate(id, { new: true });

        res.redirect('/admin-staff');
    } catch (error) {
        res.status(500).send('Internal Server Error - Unable to update staff record');
    }
});

// delete method: delete for staff
app.get('/delete-staff/:id', async (req, res) => {
    const staffId = req.params.id;

   try {
        const deletedStaff = await Staffdb.findByIdAndDelete(staffId);

        if (deletedStaff) {
            res.redirect('/admin-staff');
        } else {
            res.status(404).send('Staff Member not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error - Deletion Incomplete')
    }
});

// get method: childschema from mongodb to html
app.get('/admin-child', async (req, res) => {
    try {
        const childs = await ChildDb.find({});
        console.log(childs); 
        res.render('admin_child', {
            childList: childs
        });
    } catch (error) {
        // Handle the error, e.g., send an error response
        console.error(error);
        res.status(500).send('Internal Server Error - Server.js Child Admin');
    }
});

// post method: update for child
app.post('/update-child/:id', async (req, res) => {
    const { id } = req.params;
    const { newData } = req.body;

    try {
        const updatedChild = await ChildDb.findByIdAndUpdate(id, newData, { new: true });
        res.redirect('/admin-child');
    } catch (error) {
        res.status(500).send('Internal Server Error - Unable to update child record');
    }
});

// get method: delete for child
app.get('/delete-child/:id', async (req, res) => {
    const childId = req.params.id;

   try {
        const deletedChild = await ChildDb.findByIdAndDelete(childId);

        if (deletedChild) {
            res.redirect('/admin-child');
        } else {
            res.status(404).send('Child Profile not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error - Deletion Incomplete')
    }
});

// routes
app.get('/', (req, res) => {
    res.render('index');
});

// load routers 
app.use('/', require('./server/routes/router'));

app.listen(1616, function () {
    console.log(`Server is running on http://localhost:${PORT}`);
});

