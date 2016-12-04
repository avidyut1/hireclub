(function (){
    var app = angular.module('hireclub');
    app.controller('HomeCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state){
        $scope.editorOptions = {
            lineWrapping : true,
            lineNumbers: true,
            matchBrackets: true
        };
        $scope.submitCode = function (){
            console.log($scope.code);
            console.log($scope.input);
            $http.post('/code', {code: $scope.code, input: $scope.input}).then(function (response){
                $state.go('dashboard', {url: response.data.url});
            }, function (error){
                console.log(error);
            })
        };
    }]);
})();