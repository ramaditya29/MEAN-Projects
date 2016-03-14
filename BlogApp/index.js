/**
 * Created by root on 2/13/16.
 */
var express = require('express');
var path = require('path');
var bodyParse = require('body-parser');
var user = require('./models/user.js');
var post = require('./models/post.js');
var app = express();

app.use(bodyParse.json());
app.use(bodyParse.text());
app.use(bodyParse.json({ type: 'application/vnd.api+json'}));
var urlencodedparser = app.use(bodyParse.urlencoded({ extended: true}));

app.use(express.static(__dirname));

app.get('/new', function(request, response){
    response.sendFile(path.join(__dirname + '/register.html'));
});

app.get('/user' , function(request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/home', function(request,response){
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/register' , function(request, response){
    var username = request.body.username;
    var password = request.body.password;
    //var rpassword = request.body.rpassword;
    user.registerUser(username, password, function(message){
      response.send("User Created Successfully");
    });

});

app.post('/login', function(request, response){
    var username = request.body.username;
    var password = request.body.password;
    user.findUser(username,password, function(error, user){
        console.log("The data is :" + user);
        if(user.length == 1){
           response.send('/home');
       }
       else{
           response.send("Username and passwords are not matching");
       }

    });
});

app.post('/createPost', function(request, response){
    var postName = request.body.name;
    var postContent = request.body.content;
    console.log(postName + postContent);
    post.newPost(postName, postContent, function(error, message){
       console.log("The Post was created Succesfully");
        response.send("The Post was created Succesfully");
    });
    //response.send("Post created  Successfully");
});

app.get('/getAllPosts', function(request, response){
    post.allPosts(function(error , posts){
       console.log(posts);
        response.send(posts);
    });
});

app.post('/post', function(request, response){
    var postId = request.body.id;
    post.getPostById(postId, function(error,post){
       response.send(post);
    });
})
/*
app.post('/hello', function(request, response){
   response.send("Hello" + request.body.name);
});

app.get('/hi', function(request, response){
   response.sendFile(path.join(__dirname + '/about.html'));
});*/
app.listen(3000);

console.log("Server started successfully");