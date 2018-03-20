(function() {
    'use strict';

    angular.module('BlurAdmin.pages.login')
        .controller('LoginCtrl', LoginCtrl);

    /** @ngInject */
    function LoginCtrl($scope, localStorage, $state, $log, apiService) {

        $scope.credential = {};

        $scope.login = function () {
            apiService
                .login($scope.credential)
                .success(function (data, status, headers, config) {

                    if (data.meta.code !== 200) {return}

                    localStorage.setObject('auth', {
                        id: data.data.rows.id,
                        username: data.data.rows.username,
                        picture: data.data.rows.picture.medium,
                        token: data.data.token
                    });

                    $state.go('main.dashboard');

                }).error(function (data, status, headers, config) {
                    $log.info(data);
                });
        };

        localStorage.clear();

    }

})();