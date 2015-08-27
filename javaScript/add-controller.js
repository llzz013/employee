app.controller('add',function($scope,employee,$sce){
    $scope.Name = '';
    $scope.Title = '' ;
    $scope.Sex = '' ;
    $scope.sdate = '' ;
    $scope.ophone = '' ;
    $scope.cphone = '' ;
    $scope.sms = '' ;
    $scope.email = '' ;
    $scope.img = '' ;
    $scope.manager = '' ;
    $scope.reports = '' ;

    $scope.newData={
        name:'',
        title:'',
        sex:'M',
        startDate:'',
        officePhone:'',
        cellPhone:'',
        sms:'',
        email:'',
        img:'',
        manager:''
    };


    $scope.newEmployeeForm=function(){
        console.log("form submitted");
        newEmployee = {
            ID:0,
            Name : $scope.newData.name,
            Title : $scope.newData.title ,
            Sex : $scope.newData.sex ,
            StartDate : $scope.newData.startDate.toUTCString() ,
            OfficePhone : $scope.newData.officePhone,
            CellPhone : $scope.newData.cellPhone ,
            SMS : $scope.newData.sms ,
            Email : $scope.newData.email ,
            img: $scope.newData.img ,
            Manager : parseInt($scope.newData.manager) ,
            DirectReports :[]
        };
        msg=employee.addNewEmployee(newEmployee);
        console.log(msg);
        $scope.addAlert(msg);

    }


    $scope.employees=[];
    $scope.employees=employee.getEmployees();



    $scope.alerts = [];
    $scope.addAlert = function(msg) {
        $scope.alerts.push({type:'success',msg:msg});
    };
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };




    $scope.ManagerSelect='';
    $scope.$watch('manager',function(){
        if($scope.manager==''){
            $scope.ManagerSelect='Click to select';
        }else{
            for(i=0;i<$scope.employees.length;i++){
                if($scope.employees[i].ID==parseInt($scope.manager)){
                    $scope.ManagerSelect=$scope.employees[i].Name;
                    return;
                }
            }
            $scope.ManagerSelect='Click to select';
        }
    });
    $scope.DeleteManager=function(){
        $scope.manager = '';
    }




    $scope.imageUrl=[
        'img/despicable-me-2-Minion-icon-1.png',
        'img/despicable-me-2-Minion-icon-2.png',
        'img/despicable-me-2-Minion-icon-3.png',
        'img/despicable-me-2-Minion-icon-4.png',
        'img/despicable-me-2-Minion-icon-5.png',
        'img/despicable-me-2-Minion-icon-6.png',
        'img/despicable-me-2-Minion-icon-7.png'];


   //date picker//
    $scope.today = function() {
        $scope.newData.startDate = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.sdate = null;
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];


    //date picker end//


    $scope.save=function(){
        newEmployee = {
            ID:0,
            Name : $scope.Name,
            Title : $scope.Title ,
            Sex : $scope.Sex ,
            StartDate : $scope.sdate.toUTCString() ,
            OfficePhone : $scope.ophone,
            CellPhone : $scope.cphone ,
            SMS : $scope.sms ,
            Email : $scope.email ,
            img: $scope.img ,
            Manager : parseInt($scope.manager) ,
            DirectReports :$scope.reports
        };
        msg=employee.addNewEmployee(newEmployee);
        console.log(msg);
        $scope.addAlert(msg);
    }

});
