/* Copyright start
  MIT License
  Copyright (c) 2025 Fortinet Inc
  Copyright end */
'use strict';
(function () {
    angular
        .module('cybersponse')
        .controller('editC3Charts110Ctrl', editC3Charts110Ctrl);

    editC3Charts110Ctrl.$inject = ['$scope', '$uibModalInstance', 'config', 'appModulesService', 'Entity', 'SORT_ORDER', 'CommonUtils'];

    function editC3Charts110Ctrl($scope, $uibModalInstance, config, appModulesService, Entity, SORT_ORDER, CommonUtils) {
        $scope.config = config;
        $scope.config.customFilters = $scope.config.customFilters || {'limit':1, 'sort': ['ASC']};
        if ($scope.config.customFilters.sort.length > 0 && CommonUtils.isUndefined($scope.config.sortField)) {
          $scope.config.sortField = $scope.config.customFilters.sort[0].field;
          $scope.config.sortDirection =  $scope.config.customFilters.sort[0].direction || $scope.config.customFilters.sort[0];
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
          $scope.customResourceReset = customResourceReset;
          $scope.SORT_ORDER = SORT_ORDER;

          function customResourceReset() {
            let newResource = $scope.config.customResource;
            if (!$scope.moduleFields[newResource]) {
              populateFieldLists(newResource);
            }
            $scope.customSort = {};
          }
  
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
              let sortFilter = {
                direction: $scope.config.sortDirection,
                field: $scope.config.sortField
              }
              let field = $scope.moduleFields[$scope.config.customResource][$scope.config.sortField];
              if(field.type === 'lookup' || field.type === 'picklist') {
                sortFilter.field = $scope.config.sortField + '.uuid';
              }
              $scope.config.customFilters.sort = [sortFilter];
              $uibModalInstance.close($scope.config);
          } 
      }
})();
