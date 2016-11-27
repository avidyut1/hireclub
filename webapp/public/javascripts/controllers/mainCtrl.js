(function (){
    var app = angular.module('hireclub');
    app.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http){
        $scope.editorOptions = {
            lineWrapping : true,
            lineNumbers: true,
            matchBrackets: true
        };
        $scope.submitCode = function (){
            console.log($scope.code);
            console.log($scope.input);
            $http.post('/code', {code: $scope.code, input: $scope.input}).then(function (response){
                console.log(response.data);
            }, function (error){
                console.log(error);
            })
        };
    }]);
})();