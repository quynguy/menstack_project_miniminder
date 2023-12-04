const express = require('express');
const route = express.Router();


route.get('/admin-staff', function(req, res, next) {
    res.redirect('/add-staff');
});

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


route.get('/delete-staff/:id', async (req, res) => {
    const staffId = req.params.id;
  
    try {
      const staff = await Staff.findByIdAndDelete(staffId);
  
      if (!staff) {
        return res.status(404).send('Staff member not found');
      }

      res.redirect('/admin-staff');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  module.exports = route;