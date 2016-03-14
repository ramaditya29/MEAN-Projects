/**
 * Created by root on 2/14/16.
 */
var app = angular.module('blogapp',['ngRoute']);
var url = "http://localhost:3000";
app.config(function($routeProvider) {
   $routeProvider
       .when('/home',  {
           templateUrl : 'home.html',
           controller: 'homeCtrl'
       })
       .when('/post', {
           templateUrl: 'posts.html',
           controller: 'postsCtrl'
       })
       .when('/blog', {
           templateUrl: 'blog.html',
           controller: 'blogCtrl'
       })
       .when('/contact', {
           templateUrl: 'contact.html',
           controller: 'contactcontroller'
       })
       .when('/blog/:id', {
           templateUrl: 'post.html',
           controller: 'postCtrl'
       })
       .when('/logout', {
           controller: 'logoutCtrl'
       })
       .otherwise({
           redirectTo : '/home'
       });
});

app.controller('contactcontroller', function($scope){

});

app.controller('postCtrl', function($scope, $routeParams, $http){
    $scope.id = $routeParams.id;
    $scope.params = { id : $scope.id };
    $http.post(url + '/post', $scope.params).success(function(data, status){
       $scope.postsData = data;
        console.log($scope.postsData[0].postName);

    });
});

app.controller('logoutCtrl', function($scope, $window){
    $window.location.href = 'http://localhost:3000/user';
});


app.controller('homeCtrl' , function($scope){
    $scope.message = "Welcome to our Blog";
});

app.controller('postsCtrl', function($scope, $http) {
    $scope.posts = {name: '', content : ''};
    $scope.createNewPost = function(){


        $scope.params = { name: $scope.posts.name, content: $scope.posts.content };
        $http.post(url + '/createPost', $scope.params).success(function(data, status){
            alert(data);
            $scope.posts = {name: '', content : ''};
        });
    }
});

app.controller('blogCtrl', function($scope, $http){
    $http.get(url + '/getAllPosts').success(function(data, status){
        console.log(data);
        $scope.blogPosts = data;
    });
});

app.controller('registerCtrl', function($scope, $http){
    $scope.user = {username: '', password: '', rpassword: ''};
    $scope.createUser = function() {
        if($scope.user.password === $scope.user.rpassword){

            var url = "http://localhost:3000/";
            $scope.params = { username: $scope.user.username , password: $scope.user.password};
            $http.post('/register', $scope.params).success(function(data, status) {

                alert(data);
                $scope.user = {username: '', password: '', rpassword: ''};
            });
        }
        else {
            alert("Passwords are not matching");
            $scope.user = {username: '', password: '', rpassword: ''};
        }
    }
});

app.controller('loginCtrl', function($scope, $http, $window){
    $scope.login = {username: '', password: ''};
    $scope.loginUser = function(){
        $scope.params = { username: $scope.login.username , password: $scope.login.password};
        $http.post('/login', $scope.params).success(function(data, status){
            //alert(data);
            $window.location.href = data;
        });
    };
});

app.directive('postData', function(){
    return {
        restrict: 'E',
        templateUrl: "blogcontent.html",
        replace: true
    };
});
