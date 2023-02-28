'use strict';
(function () {
    angular
        .module('cybersponse')
        .controller('editC3Charts100Ctrl', editC3Charts100Ctrl);

    editC3Charts100Ctrl.$inject = ['$scope', '$uibModalInstance', 'config', 'appModulesService', 'Entity', 'SORT_ORDER', 'CommonUtils'];

    function editC3Charts100Ctrl($scope, $uibModalInstance, config, appModulesService, Entity, SORT_ORDER, CommonUtils) {
        $scope.config = config;
        $scope.config.customFilters = $scope.config.customFilters || {'limit':1, 'sort': []};
        if ($scope.config.customFilters.sort.length > 0) {
          $scope.customSort = {field: $scope.config.customFilters.sort[0].field, direction: $scope.config.customFilters.sort[0].direction};
        }
        else {
          $scope.customSort = {};
        }
        appModulesService.load().then(function(modules) {
              $scope.modules = modules;
  
              $scope.moduleFields = {};
              $scope.moduleFieldsArrays = {};
  
              if ($scope.config.customResource && !$scope.moduleFields[$scope.config.customResource]) {
                populateFieldLists($scope.config.customResource);
              }
          });
          $scope.cancel = cancel;
          $scope.save = save;
          $scope.SORT_ORDER = SORT_ORDER;
            
          $scope.$watch("config.customResource", function(newValue, oldValue) {
            if (oldValue == newValue) {
              return;
            }
            if (!$scope.moduleFields[newValue]) {
              populateFieldLists(newValue);
            }
            $scope.customSort = {};
          })
  
          function populateFieldLists(resource) {
            let crEntity = new Entity(resource);
                crEntity.loadFields().then(function() {
                  for (var key in crEntity.fields) {
                    if (crEntity.fields[key].type === 'datetime') {
                      crEntity.fields[key].type = 'datetime.quick';
                    }
                  }
                  $scope.moduleFields[resource] = crEntity.fields;
                  $scope.moduleFieldsArrays[resource] = crEntity.getFormFieldsArray()
                })
          }
  
          function cancel() {
              $uibModalInstance.dismiss('cancel');
          }
  
          function save() {
              if ($scope.editWidgetForm.$invalid) {
                  $scope.editWidgetForm.$setTouched();
                  $scope.editWidgetForm.$focusOnFirstError();
                  return;
              }
              $scope.processing=true;
  
              // Before saving we need to generate a pseudo-uuid value. There's not a good way to get a true uuid in angularjs
              if (! $scope.config.correlationValue) {
                var uniqueValue = CommonUtils.generateUUID();
                $scope.config['correlationValue'] = uniqueValue;
              }
              $scope.config.customFilters.sort = [$scope.customSort];
              $uibModalInstance.close($scope.config);
          } 
      }
})();
