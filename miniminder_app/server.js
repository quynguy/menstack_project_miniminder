const express = require('express');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection');

// initialize express app // 
const app = express();
const dotenv = require('dotenv');
const Staffdb = require('./server/model/staff_model');
const ChildDb = require('./server/model/child_model');

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
app.set('views', path.join(__dirname, 'views'));

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



// put method: update for staff
app.put('/update-staff/:id', async (req, res) => {
    const { id } = req.params;
    const { newData } = req.body;

    try {
        const updatedStaff = await Staffdb.findByIdAndUpdate(id, { yourField: newData }, { new: true });

        res.redirect('/admin-staff');
    } catch (error) {
        res.status(500).send('Internal Server Error - Unable to update child record');
    }
});

// delete method: delete for staff
app.get('/delete-staff/:id', (req, res) => {
    const staffId = req.params.id;
    const staffIndex = staffMembers.findIndex(member => member.id === staffId);

    if (staffIndex !== -1) {
        staffMembers.splice(staffIndex, 1);
        res.send(`Successfully deleted staff with ID ${staffId}`);
    } else {
        res.status(404).send('Staff member not found');
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
        res.status(500).send('Internal Server Error - Server.js Child Admin');
    }
});


// update for child



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

