const express = require('express');
const route = express.Router();
const Staffdb = require('../model/staff_model');

// get method: staffschema from mongodb to html
route.get('/admin-staff', async (req, res) => {
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


// get method: add staff 
route.get('/admin-staff', function(req, res, next) {
    res.redirect('/add-staff');
});



// get method: delete for staff
route.get('/delete-staff/:id', async (req, res) => {
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


// get method: update for staff
route.get('/update-staff/:id', async (req, res) => {
    const staffId = req.params.id;

    try {
        const staff = await Staffdb.findByIdAndUpdate(staffId);
        res.render('update_staff', { staff });

        if (!staff) {
            res.status(404).send('Staff not found');
        }

        res.render('update_staff', { staff });
    } catch (err) {
        res.status(500).send('Internal server error');
    }
});


// post method: update for staff
route.post('/update-staff/:id', async (req, res) => {
    const { id } = req.params;
    const { newData } = req.body;

    try {
        const updatedStaff = await Staffdb.findByIdAndUpdate(id, { new: true });

        res.redirect('/admin-staff');
    } catch (error) {
        res.status(500).send('Internal Server Error - Unable to update staff record');
    }
});


module.exports = route;


