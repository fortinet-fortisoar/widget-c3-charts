/* Copyright start
  MIT License
  Copyright (c) 2025 Fortinet Inc
  Copyright end */
'use strict';
(function () {
    angular
        .module('cybersponse')
        .controller('c3Charts110Ctrl', c3Charts110Ctrl);

    c3Charts110Ctrl.$inject = ['$scope', '$timeout', '$resource', 'API', 'config'];

    function c3Charts110Ctrl($scope, $timeout, $resource, API, config) {
        $scope.processing=true;
        $scope.config = config;
        $scope.init = init;
        $scope.errMsg = "No records matching the specified query exist.";

        function init() {
            $resource(API.QUERY + $scope.config.customResource + '?$limit=1').save($scope.config.customFilters).$promise.then(function(data) {
                if (data['hydra:member'].length == 0) {
                    $scope.noData=true;
                    $scope.processing=false;
                }
                else {
                    let moduleChartData = data['hydra:member'][0][$scope.config.customDataField];
                    if(moduleChartData) {
                        moduleChartData.bindto = "#c3Chart-"+config.correlationValue;
                    }

                    $timeout(function() {
                        if ($scope.chart) {
                            $scope.chart.destroy();
                        }
                        if(moduleChartData) {
                            $scope.chart = c3.generate(moduleChartData);
                            $scope.noData=false;
                        }else {
                            $scope.noData=true;
                        }
                    },0,false);
                }
            }).finally(function() {
                $scope.processing= false;
            });
        }
        
        $scope.$on("$destroy", function() {
            if($scope.chart) {
                $scope.chart.destroy();
            }
        })

        init();
    }
})();
