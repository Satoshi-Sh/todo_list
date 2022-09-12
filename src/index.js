import _, { divide } from 'lodash';
import './style.css';

import {Account} from './project.js'

const content = document.querySelector("#content");


// Create sideBar
const side = document.createElement('div');
side.classList.add('side-div')
side.innerHTML = `<h3 class="title">ToDo</h3>
<ul class="actions">
 <li class="add">Add New Folder</li>
 <li class="delete">Delete Folder</li>
 </ul>`

content.appendChild(side)


// create board 
const board = document.createElement('div');
board.classList.add('board')



// folders function 
function createCard(t){
const folder = document.createElement('div')
folder.classList.add('folder-card')

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
    descDiv.appendChild(b)
    
}
makeButton("Open", 'open')
makeButton("Change Name",'change')
makeButton("Delete",'delete')


board.appendChild(folder)


content.appendChild(board)
}


function cleanBoard(){
    board.innerHTML =''
}



const account = new Account()
account.addProject('Family')
account.addProject('Work')
account.addProject('Hobby')


function showFolders(){
    for (let i=0;i<account.projects.length;i++){
        createCard(account.projects[i].folderName);
    }
}

showFolders()



// console.log(account.projects)

// account.projects[0].changeName('Exercise')

// console.log(account.projects)
