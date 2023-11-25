const Staffdb = require('../model/staff_model');

module.exports = {
    admin_staff,
    create,
    show,
    find,
    update,
    deleteStaff
};


// render to admin_staff page listing all staff members 
async function admin_staff(req, res){
    try {
        const allStaff = await Staffdb.find();
        res.render('admin_staff', { staffList: allStaff });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


// create and save new staff /
async function create(req, res){
    // validate request //
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty!" });
        return; 
    };

    //new user
    const staff = new Staffdb ({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        position: req.body.position,
        birthday: req.body.birthday,
        gender: req.body.gender,
        status: req.body.status
    });

    // save user in the database
    staff
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            })  
        });

};


async function show(req, res){
    try {
        const staff = await Staffdb.findById(req.params.id);
        res.render("add_staff", { staffList: allStaff  });
    } catch (err) {
  console.log(err);
  next(Error(err));
    }
};

// retrieve and return all staff / retrieve and return a single staff //
async function find(req, res){
    Staffdb.findById(id, req.body)
    .then(staff => {
        res.send(staff);
    })
    .catch(err => {
        res.status(500).send({ message: errmessage || "Error Occurred while retriving data" });
    });
};


// update a new identified user by user id
async function update(req, res){
    if(!req.body){
        return res.status(400)
        .send({ message: "Data to update can not be empty" });
    }
    const id = req.params.id;
    Staffdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data =>{
        if(!data){
            res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!`});
        }else{
            res.send(data);
        }
    })
    .catch(err => {
        res.status(500).send({ messsage: "Error Update user information" });
    });
};

// delete a user with specified user id in the request 
async function deleteStaff(req, res){
    const id = req.params.id;
    Staffdb.findByIdAndDelete(id)

    .then(data => {
        if(!data){
            res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong`});
        }else{
            res.send({
                message: "User was deleted successfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    });
};

