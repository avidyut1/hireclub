(function (){
    var app = angular.module('hireclub');
    app.controller('DashboardCtrl', ['$http', '$scope', '$stateParams', function ($http, $scope, $stateParams){
        $scope.init = function (){
            $scope.editorOptions = {
                lineWrapping : true,
                lineNumbers: true,
                matchBrackets: true
            };
            console.log($stateParams);
            $http.get('/code/'+$stateParams.url).then(function (response){
                var data = response.data;
                $scope.code = data.code;
                $scope.input = data.input;
                $scope.lang = data.lang;
                //getting the result
                $http.post('http://api.hackerrank.com/checker/submission.json',
                    {api_key: 'http://api.hackerrank.com/checker/submission.json', lang: lang})
            });
        };
        $scope.init();
    }]);
})();