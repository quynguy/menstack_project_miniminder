const express = require('express');
const route = express.Router();
const ChildDb = require('../model/child_model');


// get method: childschema from mongodb to html
route.get('/admin-child', async (req, res) => {
    try {
        const childs = await ChildDb.find({});
        console.log(childs); 
        res.render('admin_child.ejs', {
            childList: childs
        });
    } catch (error) {
        // Handle the error, e.g., send an error response
        console.error(error);
        res.status(500).send('Internal Server Error - Server.js Child Admin');
    }
});



// get method: delete for child
route.get('/delete-child/:id', async (req, res) => {
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



// get method: update for child
route.get('/update-child/:id', async (req, res) => {
    const childID = req.params.id;

    try {
        const child = await ChildDb.findByIdAndUpdate(childId);
        res.render('update_staff', { child});

        if (!child) {
            res.status(404).send('Staff not found');
        }

        res.render('update_child', { child });
    } catch (err) {
        res.status(500).send('Internal server error');
    }
});



// post method - update child info
route.post('/update-child/:id', async (req, res) => {
    const { id } = req.params;
    const { newData } = req.body;

    try {
        const updatedChild = await ChildDb.findByIdAndUpdate(id, newData, { new: true });
        res.redirect('/admin-child');
    } catch (error) {
        res.status(500).send('Internal Server Error - Unable to update child record');
    }
});


module.exports = route;