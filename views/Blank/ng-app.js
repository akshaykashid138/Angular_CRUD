var app = angular.module("myApp",[]);

app.controller("myCtrl",function ($scope,$http) {
    $scope.initController= function () {
        $scope.getData();
    };

    $scope.getData= function () {
        $http.get('/getData').then(function (response) {
            if(response.status===200)
                $scope.students=response.data;
            else
                alert("Something Went Wrong");
        });
    };

    //Method to save data

    $scope.addStudent=function () {
        $http.post('/addStudent',$scope.students).then(function (response) {
            if(response.status===201){
                $scope.initController();
                alert('Data Added');
            }
            else {
                alert("Something Went Wrong");
            }
        })
    }
});