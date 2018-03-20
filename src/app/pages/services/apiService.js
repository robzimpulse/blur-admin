/**
 * @author l.azevedo
 * created on 29/06/2017
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.services')
        .service('apiService', apiService);

    /** @ngInject */
    function apiService($http, $log) {

        $http.defaults.headers.post["Content-Type"] = 'application/json';
        $http.defaults.headers.post["version"] = '1.4';
        $http.defaults.headers.post["device"] = '1';
        $http.defaults.headers.post["key"] = 'client01-E8CEA1347Dfdewsd12A5DAAAE468159CD7437';

        var corsUrl = 'https://cors-anywhere.herokuapp.com/';
        var baseUrl = 'http://api-dev.femaledaily.net/app/v1';

        return {
            predefined: predefined,
            login: login
        };

        function predefined() {
            return $http.get(corsUrl + baseUrl + '/user/predefined')
        }

        function login(credential) {
            $log.info(credential);
            return $http.post(corsUrl + baseUrl + '/login', credential)
        }

    }

})();