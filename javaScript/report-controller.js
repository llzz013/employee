app.controller('report',function($scope,employee,$routeParams){
    $scope.display = [] ;
    $scope.id=$routeParams.id;
    $scope.employees=employee.getReportsById($scope.id);

    $scope.employeelist = [] ;
    $scope.employeelist = employee.getEmployees() ;
    //console.log($scope.employeelist[$scope.id-1].Name) ;
    $scope.employeer =$scope.employeelist[$scope.id-1].Name ;


    $scope.display= [] ;
    for(var i = 0 ; i < 6 ; i++){
        if(i == $scope.employees.length) break ;
        $scope.display.push($scope.employees[i]) ;
        //console.log($scope.display) ;
    }


    $scope.myPagingFunction = function() {
        var last = $scope.display.length - 1;
        for(var i = 1; i <= 2; i++) {
            $scope.display.push($scope.employees[last + i]);
        }
    }
});