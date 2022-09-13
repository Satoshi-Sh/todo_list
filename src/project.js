
const makeToDo = function(title,description,dueDate,priority){
     return {
        title,
        description,
        dueDate,
        priority,
        editToDo:function(newTitle,newDescription,newDate,newPriority){
        this.title=newTitle
        this.description=newDescription,
        this.dueDate=newDate,
        this.priority = newPriority
        }
     }
}

export const Account = function(){
    let projects = [];
    //create project
    function makeProject(folderName){
        return {
        toDos :[],
        folderName:folderName,
        changeName(newName) {
          return  this.folderName = newName
        }
    }
}
    // add to do to the projects
    function addTodo(index,title,description,dueDate,priority){
        const toDo = makeToDo(title,description,dueDate,priority)
        projects.at(index).toDos.push(toDo);
    }
    function removeTodo(index){
        this.projects.slice(index,1);
    }

    function addProject(name='default'){
        const pro = new makeProject(name)
        projects.push(pro)
    }

    function removeProject(index){
        projects.splice(index,1);
    }
    //account has a default folder at first 
    addProject('default')

    addTodo(0,'test','this is a test','12/11/2020',1)
    
    return {
        projects,addProject,removeProject,addTodo,removeTodo
    }

}


