const axios = require('axios');


exports.homeRoutes = (req, res) => {
    res.render('index');
};


exports.admin_staff = (req, res) => {
    res.render('admin_staff', { staffs: "New Data" });
};

exports.add_staff = (req, res) => {
    res.render('add_staff');
};

exports.update_staff = (req, res) => {
    res.render('');
}

exports.login_page = (req, res) => {
    res.render('login_page');
}

exports.add_child = (req, res) => {
    res.render("add_child");
}

exports.update_child = (req, res) => {
    res.render('update_child');
}

exports.account_type = (req, res) => {
    res.render('privileges');
}

exports.admin_child = (req, res) => {
    res.render('admin_child');
}