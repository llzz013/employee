app.controller('detail',function($scope,employee,$routeParams){
    $scope.dis=false ;
    $scope.norep = false ;
    $scope.id=$routeParams.id;
    $scope.employee=employee.getEmployeeById($scope.id);
    //console.log($scope.employee.Manager);
    $scope.manager=employee.getEmployeeById($scope.employee.Manager) ;
    $scope.managerName='';
    if($scope.manager==null) {
        $scope.managerName = "Boss";
        $scope.dis = true;
    }else{
        $scope.managerName=$scope.manager.Name;
    }
    if($scope.employee.DirectReports.length == 0){
        $scope.norep = true ;
    }
    //console.log($scope.manager.Name);
});