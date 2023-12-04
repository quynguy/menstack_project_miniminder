const express = require('express');
const route = express.Router();


route.get('/admin-child', function(req, res, next) {
    res.redirect('/add-child');
});

route.post('/update-child/:id', async (req, res) => {
    const childId = req.params.id;

    try {
        const child = await ChildDB.findByIdAndUpdate(childId);
        res.render('update_child', { child });

        if (!child) {
            res.status(404).send('Child not found');
        }

        res.redirect('/admin-child');
    } catch (err) {
        res.status(500).send('Internal server error - Update Incomplete');
    }
});


route.get('/delete-child/:id', async (req, res) => {
    const childId = req.params.id;
  
    try {
      const child = await Child.findByIdAndDelete(childId);
  
      if (!child) {
        return res.status(404).send('Child Profile not found');
      }

      res.redirect('/admin-child');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error - Delete Incomplete');
    }
  });

  module.exports = route;