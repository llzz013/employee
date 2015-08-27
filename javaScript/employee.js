var app=angular.module('myApp',['infinite-scroll','ngRoute','ui.bootstrap']);

app.controller('myCtrl', function($scope,$http,employee){
    $scope.employees=[];
    console.log('initial');
    $http.get("./package.json").success(function(response){
        console.log(response.employee);
        employee.initial(response.employee);
        $scope.employees=employee.getEmployees();
        console.log($scope.employees);
    });

});

app.service('employee',function(){
    var employees=[];
    return{
        initial:function(data){
            employees=data;
        },
        getEmployees:function(){
            return employees;
        },
        deleteEmployee:function(index){
            employees.splice(index,1);
        },
        getEmployeeById:function(id){
            id=parseInt(id);
            for(i=0;i<employees.length;i++){
                if(employees[i].ID==id){
                    console.log(employees[i]);
                    return employees[i];
                }
            }
            return null;
        },
        addNewEmployee:function(newEmployee){
            lastId=0;
            for(i=0;i<employees.length;i++){
                if(employees[i].ID>lastId){
                    lastId=employees[i].ID;
                }
            }
            newEmployee.ID=lastId+1;
            employees.push(newEmployee);
            console.log('manager:');
            console.log(newEmployee.Manager);
            if(newEmployee.Manager!=0){
                for(i=0;i<employees.length;i++){
                    if(employees[i].ID==newEmployee.Manager){
                        console.log(employees[i]);
                        employees[i].DirectReports.push(newEmployee.ID);
                        console.log(employees[i]);
                        break;
                    }
                }
            }
            return 'Employee added! id:'+newEmployee.ID;
        },
        getReportsById:function(id){
            id=parseInt(id);
            result=[];
            reports=[];
            for(i=0;i<employees.length;i++){
                if(employees[i].ID==id){
                    reports=employees[i].DirectReports;
                    console.log(reports);
                }
            }
            for(i=0;i<reports.length;i++){
                for(j=0;j<employees.length;j++){
                    if(employees[j].ID==reports[i]){
                        result.push(employees[j]);
                    }
                }
            }
            return result;
        }
    }
});

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/',{
                templateUrl: 'EmployeeList.html',
                controller: 'list'
            }).
            when('/list', {
                templateUrl: 'EmployeeList.html',
                controller: 'list'
            }).
            when('/detail/:id',{
                templateUrl:'Details.html',
                controller:'detail'
            }).
            when('/reports/:id',{
                templateUrl:'Reports.html',
                controller:'report'
            }).
            when('/add',{
                templateUrl:'add.html',
                controller:'add'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);