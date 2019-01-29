'use strict';

//Declare global variables
var List.allLists = [];

//Function to render the initial page
function renderInitialPage(){
    //if there's local storage, redirect to lists.html
}

//Create list constructor function
function List(listTitle, taskList){
    this.listTitle = listTitle;
    this.taskList = taskList;
    List.allLists.push(this);
};

List.prototype.addTask(userText){
    var task = new Task(userText);
    this.taskList.push(task);
};

//Create new task constructor function
function Task(userText){
    this.userText = userText;
    this.checked = false;
    this.editing = false;
    this.removed = false;
};

function handleNewList(event){
    new List(listTitle, []);
    //var listTitle = event target name?
    //redirect to lists.html
}

