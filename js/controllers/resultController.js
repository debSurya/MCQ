mcqModule.controller("resultController", ['$scope', 'viewChangingService', 'progressStorageService', function($scope, viewChangingService, progressStorageService){
    $scope.isDisabled = viewChangingService.stateChecker;
    $scope.resultData = progressStorageService.resultData;
}]);