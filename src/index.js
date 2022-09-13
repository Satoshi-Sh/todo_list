import _, { divide } from 'lodash';
import './style.css';

import {Account} from './project.js'


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
            console.log('pass for now') 
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
 <input type='submit' value='Cancel' id='cancel-change' class='btn small red smaller" onclick='return false;">
`
const changeSubmit = form.querySelector('#change-submit');
changeSubmit.addEventListener('click',(e)=>{
   const  card = e.target.closest('.folder-card')

   const newName = card.querySelector('#new').value
   const index  = parseInt(card.id.split('_').at(1))
   
   const p = account.projects[index];
   p.changeName(newName)
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
    showFolders() 
})

const cancelDelete = form2.querySelector('#cancel-delete')
cancelDelete.addEventListener('click',(e)=>{
   const  card = e.target.closest('.folder-card')
   const index  = parseInt(card.id.split('_').at(1))
    changeForm2Toggle(false,index)
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
    console.log(form)
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
    console.log(form)
    if (on==true){
        form.style.display='flex'
    }
    else {
        form.style.display='none'
    }
    return form
}



const account = new Account()
account.addProject('Family')





function showFolders(){
    //sidebar 
    cleanActions()
    const actions = side.querySelector('.actions')
    const li1 = document.createElement('li')
    li1.innerHTML= `<li class="add"><i class="bi bi-pencil"></i> Add New Folder</li>`
    
    // add trigger to add folder 
    li1.addEventListener('click',()=>{
    account.addProject()
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

//default

showFolders()



console.log(account.projects)

console.log(account.projects[0].toDos[0])

