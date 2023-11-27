const express = require('express');
const route = express.Router();


route.get('/admin-child', function(req, res, next) {
    res.redirect('/add-child');
});

app.get('/update-child/:id', async (req, res) => {
    const childId = req.params.id;

    try {
        const child = await ChildDB.findById(childId);
        res.render('update_child', { child});

        if (!child) {
            res.status(404).send('Child not found');
        }

        res.render('update_child', { child });
    } catch (err) {
        res.status(500).send('Internal server error');
    }
});


app.get('/delete-child/:id', async (req, res) => {
    const childId = req.params.id;
  
    try {
      const child = await Child.findByIdAndDelete(childId);
  
      if (!child) {
        return res.status(404).send('Child Profile not found');
      }

      res.redirect('/admin-child');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });