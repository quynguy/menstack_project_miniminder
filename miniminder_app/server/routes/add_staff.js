const express = require('express');
const route = express.Router();


route.get('/admin-staff', function(req, res, next) {
    res.redirect('/add-staff');
});

app.get('/update-staff/:id', async (req, res) => {
    const staffId = req.params.id;

    try {
        const staff = await Staffdb.findById(staffId);
        res.render('update_staff', { staff });

        if (!staff) {
            res.status(404).send('Staff not found');
        }

        res.render('update_staff', { staff });
    } catch (err) {
        res.status(500).send('Internal server error');
    }
});


app.get('/delete-staff/:id', async (req, res) => {
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