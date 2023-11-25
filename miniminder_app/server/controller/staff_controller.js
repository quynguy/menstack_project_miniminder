const Staffdb = require('../model/staff_model');

// create and save new staff //
exports.create = (req, res) => {
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
    staff.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            })  
        });

};


// retrieve and return all staff / retrieve and return a single staff //
exports.find = (req, res) => {
    Staffdb.find()
    .then(staff => {
        res.send(staff);
    })
    .catch(err => {
        res.status(500).send({ message: errmessage || "Error Occurred while retriving data" });
    });
};


// update a new identified user by user id
exports.update = (req, res) => {
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
exports.delete = (req, res) => {
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


module.exports = Staffdb;