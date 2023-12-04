const express = require('express');
const route = express.Router();

const services = require('../services/render');
const staffcontroller = require('../controller/staff_controller');
const childcontroller = require('../controller/child_controller');


// Admin staff/child routes
route.get('/admin-staff', services.admin_staff);
route.get('/admin-child', services.admin_child);

// Add staff route
route.get('/add-staff', services.add_staff);
route.post('/add-staff', staffcontroller.create);

// Add child route
route.get('/add-child', services.add_child);
route.post('/add-child', childcontroller.create);

// Update staff route
route.get('/update-staff/:id', services.update_staff);
route.put('/update-staff/:id', staffcontroller.update);

// Update child route
route.get('/update-child/:id', services.update_child);
route.put('/update-child/:id', childcontroller.update);

// API routes for staff
route.post('/staffs', staffcontroller.create);
route.get('/staffs', staffcontroller.find);
route.get('/staffs/:id', staffcontroller.show);
route.get('/admin-staff', staffcontroller.admin_staff);
route.put('/staffs/:id', staffcontroller.update);
route.delete('/staffs/:id', staffcontroller.deleteStaff);

// API routes for child
route.post('/childs', childcontroller.create);
route.get('/childs', childcontroller.find);
route.get('/childs/:id', childcontroller.show);
route.get('/admin-child', childcontroller.admin_child);
route.put('/childs/:id', childcontroller.update);
route.delete('/childs/:id', childcontroller.deleteChild);


module.exports = route;