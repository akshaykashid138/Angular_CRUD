var app = angular.module("manageUsersApp", ['ngMessages', 'ui.bootstrap', 'ui.bootstrap.modal', 'smart-table']);

app.controller("manageUsersAppCtrlr", ["$scope", "$uibModal", "$http", function ($scope, $uibModal, $http) {
    //Method To Initialize Controller
    $scope.initController = function () {
        $scope.getUsersList();
    };

    //Method To Get All Users List
    $scope.getUsersList = function () {
        $http.get('/manageUsers/getUsersList').then(function (res) {
            if (res.status === 500)
                alertify.error("Something Went Wrong While Getting Users List");
            else {
                $scope.usersList = res.data;
            }
        })
    };

    //Method To Open Model
    $scope.openModal = function (mode, data, index) {
        console.log(mode, data, index);
        let modalData = {};
        if (mode === 'edit') {
            modalData = angular.copy(data);
            modalData.index = index;
        }
        modalData.mode = mode;

        $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modal.html',
            controller: 'manageUserDetails',
            scope: $scope,
            backdrop: false,
            size: 'lg',
            windowClass: 'show',
            resolve: {
                record: function () {
                    return modalData;
                }
            }
        });
    };

    //Method To Delete User
    $scope.deleteUser = function (userId, FirstName, index) {
        alertify.confirm("Delete User : " + FirstName, function () {
            $http.get(`/manageUsers/deleteUser?UserID=${userId}`).then(function (res) {
                if (res.status === 500)
                    alertify.error("Somthing Went Wrong While Deleting User");
                else {
                    alertify.success("User Deleted Successfully");
                    $scope.usersList.splice(index, 1);
                }
            })
        })
    };
}]);

//Controller For Managing Users Data
app.controller('manageUserDetails', ["$scope", "$http", "record", function ($scope, $http, record) {
    let index;
    var init = function () {
        console.log("initialized")
        $scope.user = {};
        $scope.user = record;
        index = record.index;
    };

    init();

    //Method To Add New User
    $scope.addNewUser = function () {
        $http.post('/manageUsers/addNewUser', $scope.user).then(function (res) {

            if (res.status === 500)
                alertify.error("Something Went Wrong While Adding New User");
            else if (res.status === 201) {
                alertify.success("User Added Successfully");
                $scope.usersList.push(res.data);
                $scope.close();
            }
        })
    };

    //Method To Edit User Data
    $scope.editUser = function () {
        $http.post('/manageUsers/editUser', $scope.user).then(function (res) {
            if (res.status === 500)
                alertify.error("Something Went Wrong While Updating User Details");
            else if (res.status === 201) {
                alertify.success("User Updated Successfully");
                $scope.getUsersList();
                $scope.close()
            }
        })
    };

    //Method To Close
    $scope.close = function () {
        $scope.modalInstance.close();
    }
}]);