
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
        getTodo(index){
            return toDos.at[index]
        },
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
    function removeTodo(p,index){
        p.toDos.splice(index,1);
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

    addTodo(0,'Do Dishes and Clean','Dirty dishes are piled up. Need to clean up the kitchen as soon as possible.','1/10/2022',1)
    addTodo(0,'Prepare Test','this is another test','8/10/2022',2)


    return {
        projects,addProject,removeProject,addTodo,removeTodo
    }

}


