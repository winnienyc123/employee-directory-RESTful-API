var app = angular.module('myApp', ['ngResource', 'ngProgress', 'ngAnimate', 'toaster']);

// Response interceptor for handling server errors
app.factory('httpErrorInterceptor', function ($q,toaster) {
    return {
        responseError: function (response) {
            console.log(response);
            if(response.data){
                response.data.message ? toaster.error("Error: ", response.data.message): toaster.error("Error: ", response.data);
            }
            return $q.reject(response);
        }
    };
});
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpErrorInterceptor');
});

// Show loader when requesting data
app.directive('loading',   ['$http', 'ngProgress', function ($http, ngProgress)
{
    return {
        restrict: 'A',
        link: function (scope, elm, attrs)
        {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (value)
            {
                if (value){
                    ngProgress.start();
                }else{
                    ngProgress.complete();
                }
            });
        }
    };
}]);

// Create a $resource factory to access employees table
app.factory('Employee', function($resource) {
    return $resource('/api/employees/:id', { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    });
});
