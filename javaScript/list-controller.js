app.controller('list',function($scope,employee,$http){
    $scope.sort = 'ID' ;
    $scope.text = '' ;
    $scope.display = [] ;

    $scope.manager = '' ;

    $scope.employees=employee.getEmployees();
    console.log($scope.employees);

    for(var i = 0 ; i < 6 ; i++){
        $scope.display.push($scope.employees[i]) ;
        console.log($scope.display) ;
    }

    $scope.myPagingFunction = function() {
        var last = $scope.display.length - 1;
        for(var i = 1; i <= 2; i++) {
            $scope.display.push($scope.employees[last + i]);
        }
    }

    $scope.manager = employee.getEmployeeById()

});