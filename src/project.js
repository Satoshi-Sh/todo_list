export const Account = function(){
    let projects = [];
    //create project
    function makeProject(folderName){
        return {
        toDOs :[],
        folderName:folderName,
        changeName(newName) {
          return  this.folderName = newName
        }
    }
}

    function addProject(name){
        const pro = new makeProject(name)
        projects.push(pro)
    }
    //account has a default folder at first 
    addProject('default')
    
    return {
        projects,addProject
    }

}

