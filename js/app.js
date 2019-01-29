'use strict';

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DATA
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// DOM ACCESS VARIABLES
var buttonElement = document.getElementById('add-list');
var inputElement = document.getElementById('new-title');
var textInputElement = document.getElementById('text-input');
var addTaskButtonElement = document.getElementById('add-task');
var incompleteUlElement = document.getElementById('incomplete-list');
var completeUlElement = document.getElementById('complete-list');

//OBJECT CONSTRUCTOR VARIABLES
List.allLists = [];

// LIST CONSTRUCTOR FUNCTION
function List(listTitle, taskList) {
  this.listTitle = listTitle;
  this.taskList = taskList;
  List.allLists.push(this);
  console.log('created new List instance');
}

// LIST 'ADD TASK' PROTOTYPE
List.prototype.addTask = function (userText) {
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
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION DECLARATIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Ordered with a stepdown approach. Higher level functions are on top and lower levels below.

// RENDERS CORRECT PAGE
function renderInitialPage() {
  // TODO: if there's local storage, redirect to lists.html
}

// BUTTON CLICK EVENT HANDLER
function handleNewList(event) {
  console.log('event.target:', event.target);
  event.preventDefault();
  var listTitle = inputElement.value;
  console.log(listTitle);
  new List(listTitle, []);
  window.location.href = 'lists.html'; // redirect to lists.html
}

// BUTTON CLICK EVENT LISTENER
buttonElement.addEventListener('click', handleNewList);


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTIONS FOR LIST.HTML 

// SORT AND RENDER TASKS
function renderTasks() {
  for (var i = 0; i < List.allLists[0].taskList.length; i++) {
    if (!List.allLists[0].taskList[i].complete) {
      // Change out fixed array index '[0]' and replace with different variable if we implement stretch goal of allowing multiple lists 
      appendList(incompleteUlElement, List.allLists[0].taskList[i]);
    } else {
      appendList(completeUlElement, List.allLists[0].taskList[i]); // Change out '[0]' here too if we end up allowing multiple lists
    }
  }
}

// EVENT HANDLER FOR 'ADD TASK' BUTTON CLICK
function handleAddTask(event) {
  var newTask = List.addTask(textInputElement.value); // Get text from input field 
  appendList(incompleteUlElement, newTask);
}

// ADD LIST ELEMENT TO DOM
function appendList(listElement, listItem) {
  // TODO: CREATE 'LI' ELEMENT AND APPEND THAT TO DOM

  listElement.appendChild(listItem);
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION INVOCATIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

renderInitialPage();
