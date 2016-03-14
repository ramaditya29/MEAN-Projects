/**
 * Created by root on 2/26/16.
 */
var app = angular.module('bankapp', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
        .when('/deposit/:account',  {
            templateUrl : 'deposit.html',
            controller: 'depositCtrl'
        })
        .when('/withdraw/:account',  {
            templateUrl : 'balance.html',
            controller: 'withdrawCtrl'
         })
        .otherwise({
            redirectTo : '/user'
        });
});
app.controller('loginCtrl', function($scope, $window, $http){
    $scope.login = {};

    $scope.loginUser = function(){
        console.log($scope.login.username + $scope.login.password);
        $scope.params = {email : $scope.login.username, password: $scope.login.password};
        $http.post('/users/auth' , $scope.params).success(function(data, status){
            console.log(data);
            if(data) {
                //console.log(data);
                //alert(data);

                $window.location.href = '/user';/* /' + data;*/
                //$location.url('home#/user/' + data);
            }
            else
            {
                $scope.login = {email : '', password: ''};
                alert("Wrong Username and Password");
            }
        });
    }
});


app.controller('operationsCtrl', function($scope){
    $scope.execute = function(){
        alert("Entered");
    }
});

app.controller('depositCtrl', function($scope, $routeParams, $http, $window){
    $scope.amount = "";
    $scope.account = $routeParams.account;
    $scope.deposit = function(){
        //alert($scope.account + $scope.amount);
        $scope.params = { accountnumber: $scope.account, amount : $scope.amount};
        $http.post('/users/deposit', $scope.params).success(function(data, status){
           alert("Updated Successfully");
           $window.location.reload();
        });
    };
});
app.controller('withdrawCtrl', function($scope, $routeParams, $http, $window){
    $scope.amount = "";
    $scope.account = $routeParams.account;
    $scope.withdraw = function(){
        //alert($scope.account + $scope.amount);
        $scope.params = { accountnumber: $scope.account, amount : $scope.amount};
        $http.post('/users/withdrawl', $scope.params).success(function(data, status){
            alert("Amount Withdrawn" + data);
            $window.location.reload();
        });
    };
});