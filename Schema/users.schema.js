var mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const AutoIncrement = require('../lib/auto_increment')(mongoose);

var userSchema = mongoose.Schema({
    FirstName: {type: String, unique: "User With Same UserName Already Exist"},
    LastName: {type: String, unique: "User With Same UserName Already Exist"},

    ContactNumber: {type: String, unique: "User With This Contact Number Already Exist"},
    EmailID: {type: String, unique: "User With This Email ID Already Exist"},
    Address:String,
    UserTypeID: Number

});

//Validate Data
userSchema.plugin(validator);

//Add Auto Increment To Event ID
userSchema.plugin(AutoIncrement, {
    modelName: 'users',
    type: Number,
    unique: true,
    fieldName: 'UserID'
});


module.exports = mongoose.model('users', userSchema);