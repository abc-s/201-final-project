'use strict';

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DATA
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// DOM ACCESS VARIABLES
var buttonElement = document.getElementById('add-list');
var inputElement = document.getElementById('new-title');

//OBJECT CONSTRUCTOR VARIABLES
var List.allLists = [];

// LIST CONSTRUCTOR FUNCTION
function List(listTitle, taskList) {
    this.listTitle = listTitle;
    this.taskList = taskList;
    List.allLists.push(this);
    console.log('created new List instance');
};

// LIST 'ADD TASK' PROTOTYPE
List.prototype.addTask(userText) {
    var task = new Task(userText);
    this.taskList.push(task);
    console.log('ran .addTask()');
};

// TASK CONSTRUCTOR FUNCTION
function Task(userText) {
    this.userText = userText;
    this.checked = false;
    this.editing = false;
    this.removed = false;
    console.log('created new Task instance');
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION DECLARATIONS
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Ordered with a stepdown approach. Higher level functions are on top and lower levels below.

// RENDERS CORRECT PAGE
function renderInitialPage() {
    //if there's local storage, redirect to lists.html
}

// BUTTON CLICK EVENT HANDLER
function handleNewList(submit) {
    console.log('event.target:', event.target);

    event.preventDefault();

    var listTitle = inputElement.value;
    new List(listTitle, []);
    //var listTitle = event target name?
    //redirect to lists.html
}

// BUTTON CLICK EVENT LISTENER
buttonElement.addEventListener('submit', handleNewList);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION INVOCATIONS
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

renderInitialPage();