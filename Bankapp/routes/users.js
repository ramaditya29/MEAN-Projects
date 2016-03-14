var express = require('express');
var router = express.Router();
var users = require('../models/users.js');
var session = require('express-session');
/* GET users listing. */
/*router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
    res.render('login');
});
router.get('/user/:account', function(req,res,next){
    res.render('user', {"title" : "Bank of USA"});
});*/
var sess;
router.get('/', function(req,res,next){
    sess = req.session;
    if(sess.email){
        res.render('user');
    }
    else {
        res.render('login');
    }
});

router.get('/home' , function(req,res,next){
    res.render('user');
});
router.post('/users/create', function(req,res, next){
    var custname = req.query.name;
    var SSN = req.query.SSN;
    var cell = req.query.cell;
    var email = req.query.email;
    var address = req.query.address;
    var password = req.query.password;
    users.create(custname, SSN, cell, email, address, password , function(error, data){
        if(error){
            throw error;
        }
        res.send(data);
    });
});

router.post('/users/auth', function(req, res, next){

    var email = req.body.email;
    var password = req.body.password;

    console.log("The email is " + sess.email + password);
    if(email != '' || password != '')
    {
        users.findUser(email, password, function(error, user){
           if(error){
               throw error;
           }
            console.log(user);
            sess = req.session;
            sess.email = req.body.email;
            sess.account = user[0].account;
            if(user.length == 1)
                res.json(user[0].account);
           else
                res.json(false);
        });
    }
    else
    {
        res.send("Please enter the Username and Password");
    }
});

router.post('/users/deposit', function(req, res, next){
    var accountnumber = req.body.accountnumber;
    var amount = req.body.amount
    //accountnumber = int(accountnumber);
    //amount = parseInt(amount);
    users.depositAmount(accountnumber, amount, function(error, data){
        if(error){
            throw error;
        }
        console.log(data);
        if(data)
            res.send("Success");
        else
            res.send("Failure");
    });
});

router.post('/users/withdrawl', function(req, res, next){
    var accountnumber = req.body.accountnumber;
    var amount = req.body.amount
    //accountnumber = int(accountnumber);
    //amount = parseInt(amount);
    users.withdrawlAmount(accountnumber, amount, function(error, data){
        if(error){
            throw error;
        }
        console.log(data);
        if(data)
            res.send("Success");
        else
            res.send("Failure");
    });
});

router.post('/users/balance', function(req, res, next){
   var account = req.query.accountnumber;
    var password = req.query.password;
    users.userBalance(account, password, function(error, data){
        console.log(data);
       if(data){
           res.send(data);
       }
       else{
           res.send("No Such Account");
       }
    });
});

router.get('/sample', function(req,res,next){
    sess = req.session;
    if(sess.email)
    {

        //res.write('<h1>Hello '+sess.email+'</h1>');
        users.getUserAccounts(sess.email, function(error, data){
            if(error){
                throw error;
            }
            res.render('user' , { data : data } );
        });

        //res.end('<a href="/logout">Logout</a>');
    }
    else
    {
        res.write(' <h1>Please login first.</h1> ');
        res.end('<a href="/">Login</a>');
    }
});

router.get('/user', function(req, res){
    sess = req.session;
    if(sess.email)
    {

        //res.write('<h1>Hello '+sess.email+'</h1>');
        users.getUserAccounts(sess.email, function(error, data){
            if(error){
                throw error;
            }
            res.render('user' , { data : data } );
        });

        //res.end('<a href="/logout">Logout</a>');
    }
    else
    {
        res.write(' <h1>Please login first.</h1> ');
        res.end('<a href="/">Login</a>');
    }
});
router.get('/logout', function(req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
});

module.exports = router;

