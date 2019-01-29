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

// =====
task.prototype.createLi = function() {
// Create DOM Variables
var listElement = document.createElement('li');
var labelElement = document.crateElement('label');
var inputElement = document.createElement('input');
var buttonElement = document.createElement('button');

// Add content & HTML attributes to variables
inputElement.innerHTML = this.userText
inputElement.type = 'checkbox';
  if (this.checked = true) {
    inputElement.complete = 'checked';
    listElement.class = 'complete';
  } else {
    listElement.class = 'incomplete';
  }
buttonElement.innerHTML = 'X'
labelElement.appendChild(inputElement);
labelElement.appendChild(buttonElement);
listElement.appendChild(labelElement);
// ====
// return listElement
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION DECLARATIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Ordered with a stepdown approach. Higher level functions are on top and lower levels below.

// RENDER LIST TITLE
function renderListName() {
  h1Element.textContent = List.allLists[0].listTitle;
}

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
