'use strict';

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DATA
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// DOM ACCESS VARIABLES - lists.html
var h1Element = document.getElementById('list-name');
var textInputElement = document.getElementById('text-input');
var addTaskButtonElement = document.getElementById('add-task');
var incompleteUlElement = document.getElementById('incomplete-list');
var completeUlElement = document.getElementById('complete-list');

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION DECLARATIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Ordered with a stepdown approach. Higher level functions are on top and lower levels below.

// RENDER ON PAGE LOAD
function renderOnPageLoad() {

  getListsFromLocalStorage();
  renderListName();
  List.allLists[0].renderTasks();
}


// RENDER LIST TITLE
function renderListName() {
  h1Element.textContent = List.allLists[0].listTitle;
}

// SORT AND RENDER TASKS


// EVENT HANDLER FOR 'ADD TASK' BUTTON CLICK
function handleAddTask(event) {
  event.preventDefault();
  // console.log(event.target);

  var userText = textInputElement.value;
  console.log(userText);

  List.allLists[0].addTask(userText);

  List.allLists[0].renderTasks();

  // var newTask = List.addTask(textInputElement.value); // Get text from input field 
  // appendList(incompleteUlElement, newTask);
}

// ADD LIST ELEMENT TO DOM
function appendList(listElement, listItem) {
  // TODO: CREATE 'LI' ELEMENT AND APPEND THAT TO DOM

  listElement.appendChild(listItem);
}

// 'ADD TASK' BUTTON CLICK EVENT LISTENER
addTaskButtonElement.addEventListener('click', handleAddTask);



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION INVOCATIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// new List('firstList', []);

renderOnPageLoad();
