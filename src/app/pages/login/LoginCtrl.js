(function() {
    'use strict';

    angular.module('BlurAdmin.pages.login')
        .controller('LoginCtrl', LoginCtrl);

    /** @ngInject */
    function LoginCtrl($scope, localStorage, $state, $log, $http) {

        $scope.credential = {};

        $scope.login = function () {

            var config = {
                headers: {
                    'version': 1.4,
                    'device': 1,
                    'key': 'client01-E8CEA1347Dfdewsd12A5DAAAE468159CD7437',
                    'content-type': 'application/json'
                }
            };

            $log.info($scope.credential);

            // localStorage.setObject('dataUser', $scope.credential);

            $http
                .post('http://api-dev.femaledaily.net/app/v1/login', $scope.credential, config)
                .success(function (data, status, headers, config) {
                    $log.info(data);
                    $state.go('main.dashboard');
                })
                .error(function (data, status, headers, config) {
                    $log.info(data);
                })

        };

        localStorage.clear();

    }

})();