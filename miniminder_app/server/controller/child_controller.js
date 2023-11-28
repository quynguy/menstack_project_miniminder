const ChildDB = require('../model/child_model');

module.exports = {
    admin_child,
    create,
    show,
    find,
    update,
    deleteChild
};


async function admin_child(req, res){
    try {
        const allChild = await ChildDB.find();
        res.render('admin_child', { childList: allChild });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error - Admin Page Can Not Load');
    }
};



async function create(req, res){
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty!" });
        return; 
    };

    console.log("Request Body:", req.body);
    
    const child = new ChildDB ({
        name: req.body.name,
        birthday: req.body.birthday,
        parents: req.body.parents,
        number: req.body.number,
        teacher: req.body.teacher,
        gender: req.body.gender,
    });


    child
        .save()
        .then(data => {
            res.redirect('/admin-child')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            })  
        });

};


async function show(req, res){
    try {
        const child = await ChildDB.findById(req.params.id);
        res.render("add_child", { childList: Child  });
    } catch (err) {
  console.log(err);
  next(Error(err));
    }
};

async function find(req, res){
    ChildDB.findById(id, req.body)
    .then(child => {
        res.send(child);
    })
    .catch(err => {
        res.status(500).send({ message: errmessage || "Error Occurred while retriving data" });
    });
};


async function update(req, res){
    if(!req.body){
        return res.status(400)
        .send({ message: "Data to update can not be empty" });
    }
    const id = req.params.id;
    ChildDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

async function deleteChild(req, res){
    const id = req.params.id;
    ChildDB.findByIdAndDelete(id)

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

