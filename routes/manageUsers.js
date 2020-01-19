let router = require('express').Router();

//Users Schema Imported Here
let userSchema = require('../Schema/users.schema');

//Method To Render Manage Users Page
router.get('/manageUsers', function (req, res) {
    res.render("ManageUsers/index");
});

//Method To Add New User
router.post('/manageUsers/addNewUser', function (req, res) {
    let newUser = new userSchema(req.body);
    newUser.save(function (err, record) {
        if(err)
            res.sendStatus(500);
        else{
            res.status(201).send(record);
        }
    })
});

//Method To Get Users List ---[READ]
router.get('/manageUsers/getUsersList', function (req, res) {
    userSchema.find(function (err, users) {
        if(err)
            res.sendStatus(500);
        else
            res.send(users);
    })
});

//Method To Update User Data ---[UPDATE]
router.post('/manageUsers/editUser', function (req, res) {
    userSchema.findOneAndUpdate({UserID: req.body.UserID}, {$set: req.body}, function (err, data) {
        if(err)
            res.sendStatus(500);
        else{
            res.sendStatus(201);
        }
    })
});

//Method To Delete User
router.get('/manageUsers/deleteUser', function (req, res) {
    userSchema.findOneAndRemove({UserID: parseInt(req.query.UserID)}, function (err) {
        if(err)
            res.sendStatus(500);
        else
            res.sendStatus(201);
    });
});


module.exports = router;