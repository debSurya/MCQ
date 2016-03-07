mcqModule.service("retrieveDataService", ['$http', function($http){
    this.returnData = function(){
        return $http.get("data/mcqData.json");
    };
}]);