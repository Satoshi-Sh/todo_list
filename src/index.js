import _, { divide } from 'lodash';
import './style.css';

import storageAvailable from './localstorage.js'

import {Account} from './project.js'


// use local storage to keep account information
let account;
if (storageAvailable('localStorage')) {
    if (!localStorage.getItem('account')){
    account = new Account()
    // default
    account.addProject('Family')
    account.addProject('Work')
    account.addProject('Health')
    updateStorage(account)
    } else {
    //
    // set up data from local storage
    account = new Account()
    // remove default
    account.removeProject(0)
    const dict = JSON.parse(localStorage.getItem('account'))
    
    for (let i=0; i<dict.length;i++){
        account.addProject(dict[i].folderName)
        const ts= dict[i].todos
        for (let j=0; j<ts.length;j++){
            const td= ts[j]
            account.addTodo(i,td.title,td.description,td.dueDate,td.priority)
        }

    }
    }

    console.log(account)
  }
  else {
    account = new Account()
// default
account.addProject('Family')
account.addProject('Work')
account.addProject('Health')

  }

  function updateStorage(account){
    if (storageAvailable('localStorage')){
        let dict = []
        for (let i=0; i <account.projects.length; i++){
            const folderName = account.projects[i].folderName
            const todos = account.projects[i].toDos
            let ls = [];
            for (let j=0; j<todos.length;j++){
                const todo = todos[j]
                ls.push({'title':todo.title,'description':todo.description,'dueDate':todo.dueDate,'priority':todo.priority})
            }
            dict.push({'folderName':folderName,'todos':ls})

        }
        localStorage.setItem('account',JSON.stringify(dict))
    }     
  }






const content = document.querySelector("#content");


// Create sideBar
const side = document.createElement('div');
side.classList.add('side-div')
side.innerHTML = `<h3 class="title">ToDo</h3>
<ul class="actions">
 
 </ul>`

content.appendChild(side)





// create board 
const board = document.createElement('div');
board.classList.add('board')



// folders function 
function createCard(t,id){
const folder = document.createElement('div')
folder.classList.add('folder-card')
folder.setAttribute('id',`folder_${id}`)

//title div
const titleDiv = document.createElement('div')
titleDiv.classList.add('title-div')
titleDiv.innerHTML = `<div class="title-line"><i id="folder" class="bi bi-folder-fill zoom"></i><h2>${t}</h2></div>`
folder.appendChild(titleDiv)
//add trigger to icon

const folderIcon = titleDiv.querySelector('#folder')
folderIcon.onclick = function(){
    const order = folderIcon.closest('.folder-card').id.split('_').at(1)
    showTodos(order);
}


//desc div
const descDiv = document.createElement('div')
descDiv.classList.add('desc-div')

folder.appendChild(descDiv)

//make buttons
function makeButton(text,tagName) {
    const b = document.createElement('button');
    b.innerText=text
    b.classList.add('btn');
    b.classList.add('zoom');
    b.setAttribute('id',tagName) ;

    b.addEventListener('click',(e)=>{
        // index of card clicked
        const card = e.target.closest('.folder-card')
        const index = parseInt(card.id.split('_').at(1))
        const action = e.target.id
        if (action=='open'){
            showTodos(index)
        } else if(action=='change' & card.querySelector('.deleteForm').style.display=='none'){
            
            changeFormToggle(true,index);
             
        }
        else if(action=='delete' & card.querySelector('.changeForm').style.display=='none'){
            changeForm2Toggle(true,index);
            //account.removeProject(index);
        }

    })
    descDiv.appendChild(b)
    
}
makeButton("Open", 'open')
makeButton("Change Name",'change')
makeButton("Delete",'delete')

//add changeform section 

const form = document.createElement('form')
form.style.display='none';
form.classList.add('changeForm')
form.innerHTML = `
 <input type="text" id='new' placeholder="New Folder Name">
 <input type='submit' id='change-submit' class ="btn small" onclick="return false;">
 <input type='submit' value='Cancel' id='cancel-change' class='btn small red' onclick="return false;">
`
const changeSubmit = form.querySelector('#change-submit');
changeSubmit.addEventListener('click',(e)=>{
   const  card = e.target.closest('.folder-card')

   const newName = card.querySelector('#new').value
   if (newName ==''){
    alert('Folder name cannot be empty')
    return false;
   }
   const index  = parseInt(card.id.split('_').at(1))
   
   const p = account.projects[index];
   p.changeName(newName)
   updateStorage(account)
   showFolders() 
})

const cancelChange = form.querySelector('#cancel-change');
cancelChange.addEventListener('click',(e)=>{
    const  card = e.target.closest('.folder-card')
    const index  = parseInt(card.id.split('_').at(1))

    changeFormToggle(false,index);
})

descDiv.appendChild(form);

//add delete confirm button

const form2 = document.createElement('form')
form2.style.display='none';
form2.classList.add('deleteForm')
form2.innerHTML = `
<input type=submit' value="Confirm Delete" id='confirm-delete' class="btn small green smaller" onclick="return false;">
<input type=submit' value="Cancel" id='cancel-delete' class="btn small red smaller" onclick="return false;">
`

const confirmDelete = form2.querySelector('#confirm-delete')
confirmDelete.addEventListener('click',(e)=>{
    const  card = e.target.closest('.folder-card')
    const index  = parseInt(card.id.split('_').at(1))
    account.removeProject(index)
    updateStorage(account)
    showFolders() 
})

const cancelDelete = form2.querySelector('#cancel-delete')
cancelDelete.addEventListener('click',(e)=>{
   const  card = e.target.closest('.folder-card')
   const index  = parseInt(card.id.split('_').at(1))
    changeForm2Toggle(false,index)
    return false;
})

descDiv.appendChild(form2)




board.appendChild(folder)


content.appendChild(board)
}


function cleanBoard(){
    board.innerHTML =''
}

function cleanActions(){
    const actions = side.querySelector('.actions')
    actions.innerHTML=''
}



function changeFormToggle(on=true,index){
    const form = document.querySelector(`#folder_${index}`).querySelector('.changeForm')
    if (on==true){
        form.style.display='flex'
    }
    else {
        form.style.display='none'
    }
    return form
}

function changeForm2Toggle(on=true,index){
    const form = document.querySelector(`#folder_${index}`).querySelector('.deleteForm')
    if (on==true){
        form.style.display='flex'
    }
    else {
        form.style.display='none'
    }
    return form
}




function showFolders(){
    //sidebar 
    cleanActions()
    const actions = side.querySelector('.actions')
    const li1 = document.createElement('li')
    li1.innerHTML= `<li class="add"><i class="bi bi-pencil"></i> Add New Folder</li>`
    
    // add trigger to add folder 
    li1.addEventListener('click',()=>{
    account.addProject()
    updateStorage(account)
    showFolders()
})


    actions.appendChild(li1)


    //board
    cleanBoard()
    let count=0;
    for (let i=0;i<account.projects.length;i++){
        createCard(account.projects[i].folderName,count);
        count++
    }
}

// Todo page 

function showTodos(index){
   
   // make page empty
   cleanBoard()
   cleanActions()

   // side 
   const actions = side.querySelector('.actions')
    const li1 = document.createElement('li')
    li1.innerHTML= `<li class="addTodo"><i class="bi bi-pencil"></i> Add New Todo</li>`
    actions.appendChild(li1)
    li1.onclick = function(){
        account.addTodo(index,'default','Please update me','01/01/1970',0);
        updateStorage(account)
        showTodos(index)
    }

    const li2 = document.createElement('li')
    li2.innerHTML = `<li class="back"><i class="bi bi-arrow-return-left"></i> Back to Folders</li>`
    li2.onclick= showFolders
    actions.appendChild(li2)

   // board 
   function makeCard(id,title,priority,date,description){
   const card = document.createElement('div');
   card.classList.add('todo-card')
   card.setAttribute('id',`todo_${id}`)
   //header of card
   const header = document.createElement('div')
   let color;
   if (priority==1){
    color='redflag' 
   } else if(priority==2){
    color='yellowflag'
   } else if (priority==3){
    color='greenflag'
   }

   header.classList.add('header')
   header.innerHTML=`<h3 class='title'>${title} <i class="bi bi-flag-fill ${color}"></i></h3> 
                     <p id='due'>Due Date ${date}</p>
                     </div>`
   card.appendChild(header)

   // desc section of card 

   const cardContent = document.createElement('div')
   cardContent.classList.add('card-content')
   cardContent.innerHTML= `
   <div class="description">
   ${description}
   </div>
   <div class="buttons">
   <button class=btn small id="update">Update</button>
   <button class=btn small id="deleteTodo">Delete</button>
   <form class='confirm2'>
   <input type='submit' value="Confirm Delete" id='confirm-delete2' class="btn small green">
   <input type='submit' value="Cancel" id='cancel-delete2' class="btn small red">
   </form>
   </div>

   `

   

   //add trigger to the buttons 
   
   //Update button 
   const upadateTodo =cardContent.querySelector('#update');
   upadateTodo.onclick = function(){
   addForm(index,id)
   upadateTodo.disabled=true;
   }

   
   //delete button
   const deleteTodo = cardContent.querySelector('#deleteTodo');
   deleteTodo.onclick = function(){
    const confirm2 = cardContent.querySelector('.confirm2')
    //show confirm form
    confirm2.style.display= 'flex' 
    //account.removeTodo(account.projects[index],parseInt(id))
    //showTodos(index)
   }

   // delete confirm
   const confirmDelete2 = cardContent.querySelector('#confirm-delete2');
   confirmDelete2.onclick = function(){
    account.removeTodo(account.projects[index],parseInt(id))
    updateStorage(account)
    showTodos(index)
    return false;
   }
   // delete cancel
   const cancelDelete2 = cardContent.querySelector('#cancel-delete2');
   cancelDelete2.onclick = function (){
    const confirm2 = cardContent.querySelector('.confirm2')
    //show confirm form
    confirm2.style.display= 'none' 
    return false;
   }



   card.appendChild(cardContent)

   board.appendChild(card)}

   const todos = account.projects[index].toDos
   for (let i=0; i<todos.length;i++){
    const todo = todos.at(i);
    makeCard(i,todo.title,todo.priority,todo.dueDate,todo.description)
   }
   
    
}


function addForm(index,id){
    const form = document.createElement('div')
    const todo = account.projects[index].toDos.at(id)
    form.classList.add('updateForm')
    form.setAttribute('id',`form_${id}`)
    if (todo.title=='default'){
    form.innerHTML = `
    <input type='text' id='todoTitle' placeholder='Title'>
    <input type='date' id='date'>
    <textarea id="description"  rows="5" cols="38" placeholder='Todo description'></textarea>
    <input type='number' placeholder='1-3(1 is most important)' id = 'priorityNumber' min='1' max='3'>
    <input type='submit' class='btn green' value='Save' id='saveUpdate' onClick='return false;'>
    <input type='submit' class='btn red' value='Cancel' id='cancelUpdate'>
    `} else {
        form.innerHTML =     `
    <input type='text' value='${todo.title}' id='todoTitle' placeholder='Title'>
    <input value='' type='date' id='date'>
    <textarea id="description" rows="5" cols="38" placeholder='Todo description'>${todo.description}</textarea>
    <input type='number' value='${todo.priority}' placeholder='1-3(1 is most important)' id = 'priorityNumber' min='1' max='3'>
    <input type='submit' class='btn green' value='Save' id='saveUpdate'>
    <input type='submit' class='btn red' value='Cancel' id='cancelUpdate'>
    `
    }

    //save button trigger 
    const saveUpdate = form.querySelector('#saveUpdate')
    saveUpdate.onclick = function (e){
        const updateForm = e.target.closest('.updateForm')
        const newTitle = updateForm.querySelector('#todoTitle').value
        const newDate = updateForm.querySelector('#date').value
        const newDesc = updateForm.querySelector('#description').value
        const newPri = updateForm.querySelector('#priorityNumber').value

        // validate 
        if (newTitle==''| newDate==''| newDesc==''){
            alert('Any field cannot be empty')
            return false;
        } else if (newPri <1 | newPri >3) {
            alert('Priority should be 1,2, or 3.')
            return false;
        }
        //update todo 
        todo.editToDo(newTitle,newDesc,newDate,newPri)
        updateStorage(account)
        showTodos(index)
        return false;
    }


    //cancel button trigger
    const cancelUpdate = form.querySelector('#cancelUpdate')
    cancelUpdate.onclick = function (){
        const index = form.id.split('_').at(1)
        const card = document.querySelector(`#todo_${index}`)
        card.querySelector('#update').disabled=false;
        form.remove()
        return false;
    }
    
    const cardUpdate = document.querySelector(`#todo_${id}`)
    cardUpdate.after(form)
 }








//default
showFolders()




