mcqModule.controller("mainController", ['$scope', '$mdDialog', 'viewChangingService', 'retrieveDataService', 'progressStorageService', function ($scope, $mdDialog, viewChangingService, retrieveDataService, progressStorageService) {
    $scope.isDisabled = viewChangingService.stateChecker;
    $scope.mcqData = [];
    $scope.counter = 1;
    $scope.retryFlag = 0;
    $scope.firstLoad = 0;
    $scope.testMarks = 0;
    $scope.firstAttempt = 0;
    $scope.secondAttempt = 0;
    retrieveDataService.returnData().success(function (data) {
        $scope.mcqData = data;
    });
    $scope.loadData = function () {
        $scope.questionValue = $scope.mcqData[$scope.index]["ques" + $scope.counter].ques;
        $scope.ans1Value = $scope.mcqData[$scope.index]["ques" + $scope.counter].ans1;
        $scope.ans2Value = $scope.mcqData[$scope.index]["ques" + $scope.counter].ans2;
        $scope.ans3Value = $scope.mcqData[$scope.index]["ques" + $scope.counter].ans3;
        $scope.ans4Value = $scope.mcqData[$scope.index]["ques" + $scope.counter].ans4;
        $scope.submitDisabledStatus = true;
    };
    $scope.storeData = function () {
        progressStorageService.resultData.obtainedMarks = $scope.testMarks;
        progressStorageService.resultData.answerIn1st = $scope.firstAttempt;
        progressStorageService.resultData.answerIn2nd = $scope.secondAttempt;
        progressStorageService.resultData.testTitle = $scope.mcqData[$scope.index].title;
    };
    $scope.loadQuestion = function () {
        if ($scope.firstLoad === 0) {
            $scope.loadData();
            $scope.firstLoad = 1;
        } else {
            if ($scope.answer === $scope.mcqData[$scope.index]["ques" + $scope.counter].correct) {
                if ($scope.retryFlag === 0) {
                    $scope.testMarks += 25;
                    $scope.firstAttempt++;
                } else if ($scope.retryFlag === 1) {
                    $scope.testMarks += 12.5;
                    $scope.secondAttempt++;
                }
                if ($scope.counter !== 4) {
                    $scope.counter++;
                    $scope.loadData();
                    $scope.retryFlag = 0;
                } else {
                    $scope.storeData();
                    viewChangingService.stateChecker.controllerVisibility = true;

                }
            } else {
                if ($scope.retryFlag === 0) {
                    $mdDialog.show($mdDialog.alert()
                                   .clickOutsideToClose(false)
                                   .title("INVALID ANSWER")
                                   .textContent("One more try!")
                                   .ok("Retry!"));
                    $scope.retryFlag++;
                } else {
                    if ($scope.counter !== 4) {
                        $scope.counter++;
                        $scope.loadData();
                        $scope.retryFlag = 0;
                    } else {
                        $scope.storeData();            
                        viewChangingService.stateChecker.controllerVisibility = true;
                    }
                }
            }
        }
    }
}]);