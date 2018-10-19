angular.module("todoApp",[]).controller("todoController", function($scope){
    var controller = this;
    
    controller.todoList = [];
    
    controller.init = function() {    
                
        if(localStorage.getItem("todos")) {
            controller.todoList = JSON.parse(localStorage.getItem("todos"));
        }
        
    }
    
    controller.addTodo = function() {
        var title = controller.title;
        var desc = controller.description;
        var checked = false;
        
        var todo = new Todo(title, desc, checked);
        
        
        controller.todoList.unshift(todo);  
        
        localStorage.setItem("todos", JSON.stringify(controller.todoList));
        
        controller.title = "";
        controller.description = "";
    }
    
    controller.updateList = function(index) {
        localStorage.setItem("todos", JSON.stringify(controller.todoList));
                
        if(controller.todoList[index].completed == true) {
            controller.reorderListToCompleted(index);
        }
        if(controller.todoList[index].completed == false) {
            controller.reorderListToUncompleted(index);
        }
        
    }
    
    controller.reorderListToCompleted = function(index) {
        var todo = controller.todoList[index];
        
        controller.todoList.splice(index, 1);
        
        controller.todoList.push(todo);
        
        localStorage.setItem("todos", JSON.stringify(controller.todoList));
    }
    
    controller.reorderListToUncompleted = function(index) {
        var todo = controller.todoList[index];
        
        controller.todoList.splice(index, 1);
        
        controller.todoList.unshift(todo);
        
        localStorage.setItem("todos", JSON.stringify(controller.todoList));
    }
    
    controller.disableRow = function(index) {
        if(controller.todoList[index].completed == true) {
            return true;
        }
        
        return false;
    }
    
    controller.isValid = function(index) {        
        if($('#title').val() == "") {
            return false;
        }
        
        if($('#desc').val() =="") {
            return false;
        }
                
        return true;
    }
    
    controller.deleteTodo = function(index) {
        controller.todoList.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(controller.todoList));
    }
    
});