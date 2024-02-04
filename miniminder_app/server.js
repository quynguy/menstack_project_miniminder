const express = require('express');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const dotenv = require('dotenv');
const connectDB = process.env.MONGO_URI;

// Initialize express app
const app = express();
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 1616;

// Middleware
app.use(morgan('tiny'));
app.use(bodyparser.urlencoded({ extended: false }));

// Set view engine
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// Serve static assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// Database models
const Staffdb = require('./server/model/staff_model');
const ChildDb = require('./server/model/child_model');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Admin Staff routes
app.get('/admin-staff', getAdminData(Staffdb, 'admin_staff'));

app.post('/update-staff/:id', updateData(Staffdb, '/admin-staff'));

app.get('/delete-staff/:id', deleteData(Staffdb, '/admin-staff'));

// Admin Child routes
app.get('/admin-child', getAdminData(ChildDb, 'admin_child'));

app.post('/update-child/:id', updateData(ChildDb, '/admin-child'));

app.get('/delete-child/:id', deleteData(ChildDb, '/admin-child'));

// Load routers
app.use('/', require('./server/routes/router'));

// Start server
app.listen(1616, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

