/**
 * Created by root on 2/15/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var message = "";

mongoose.connect("mongodb://50.18.217.186:27017/blog");

var userModel = new Schema({
    userId: ObjectId,
    username: String,
    password: String
});

var User = mongoose.model('Users', userModel);

exports.registerUser = function(username, password, callback){


    var new_user = new User({username : username, password: password });

    new_user.save(function(error){
        if(error){
            throw error;
        }
        message = "User Successfully Created";
        callback(null, message);
    });
};

exports.findUser = function(username, pwd, callback){
    User.find({username: username, password: pwd}).exec(function(error, user){
       if(error){
           throw error;
       }
       console.log(user);
        callback(null,user);
    });
}