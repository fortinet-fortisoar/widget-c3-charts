'use strict';
(function () {
    angular
        .module('cybersponse')
        .controller('c3Charts100Ctrl', c3Charts100Ctrl);

    c3Charts100Ctrl.$inject = ['$scope', '$timeout', '$resource', 'API', 'config'];

    function c3Charts100Ctrl($scope, $timeout, $resource, API, config) {
        $scope.processing=true;
        $scope.config = config;
        $scope.init = init;
        $scope.errMsg = "No results for this chart yet. Data generation playbook has been triggred and results will populate shortly.";

        function init() {
            var dataFormat = {
                bindto: "#c3Chart-"+config.correlationValue
            };

            $resource(API.QUERY + $scope.config.customResource + '?$limit=1').save($scope.config.customFilters).$promise.then(function(data) {
                if (data['hydra:member'].length == 0) {
                    $scope.errMsg = "No records matching the specified query exist.";
                    $scope.noData=true;
                    $scope.processing=false;
                }
                else {
                    let moduleChartData = data['hydra:member'][0][$scope.config.customDataField];
                    moduleChartData.bindto = "#c3Chart-"+config.correlationValue;

                    $timeout(function() {
                        c3.generate(moduleChartData);
                        $scope.noData=false;
                        $scope.processing=false;
                        },
                    0,
                    false)
                }
            });
        }
        
        init();
    }
})();
