app.controller('employeeController', function($scope, Employee, ngProgress, toaster) {

  $scope.employee = new Employee();

  var refresh = function() {
    $scope.employees = Employee.query();
    $scope.employee ="";
  };
  refresh();

  $scope.add = function(employee) {
    Employee.save(employee,function(employee){
      refresh();
    });
  };

  $scope.update = function(employee) {
    employee.$update(function(){
      refresh();
    });
  };

  $scope.remove = function(employee) {
    employee.$delete(function(){
      refresh();
    });
  };

  $scope.edit = function(id) {
    $scope.employee = Employee.get({ id: id });
  };

  $scope.clear = function() {
    $scope.employee = "";
  }

});