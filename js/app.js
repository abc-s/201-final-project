'use strict';
// app.js is global and linked to each html file

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DATA
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//GLOBAL VARIABLES
List.allLists = []; // Array to store all lists

// LIST CONSTRUCTOR FUNCTION
function List(listTitle, taskList) {
  this.listTitle = listTitle;
  this.taskList = taskList;
  List.allLists.push(this);
}

// LIST PROTOTYPE FUNCTIONS
// Adds a Task to a List, pushes Task to array within the List
List.prototype.addTask = function (userText) {
  var task = new Task(userText, false, false, false);
  this.taskList.push(task);
};

// Renders tasks to the DOM
List.prototype.renderTasks = function () {
  // Make lists empty on page
  incompleteUlElement.innerHTML = '';
  completeUlElement.innerHTML = '';
  // Loop through the tasks of a list
  for (var i = 0; i < this.taskList.length; i++) {
    var newLi = this.taskList[i].createLi();      // create a li for each task 
    if (this.taskList[i].checked === false) {     // if the task isn't checked, append the 'incomplete' ul
      incompleteUlElement.appendChild(newLi);
    } else {                                      // if the task is checked, append the 'complete' ul
      completeUlElement.appendChild(newLi);
    }
  }
  removeListsFromLocalStorage();  // clear the old list from local storage
  saveListsToLocalStorage();      // add the new list to local storage
};

// TASK CONSTRUCTOR FUNCTION
function Task(userText, checked, editing, removed) {
  this.userText = userText;
  this.checked = checked;
  this.editing = editing;
  this.removed = removed;
  // console.log('created new Task instance');
}

// TASK PROTOTYPE FUNCTION - creates HTML elements for each task
Task.prototype.createLi = function () {
  // Create HTML elements for each task
  var liElement = document.createElement('li');
  var labelElement = document.createElement('label');
  var inputElement = document.createElement('input');
  var textInputElement = document.createElement('input');
  var deleteButtonElement = document.createElement('button');

  // Give each task's HTML elements content
  inputElement.type = 'checkbox';
  if (this.checked === true) {
    inputElement.checked = 'checked';
    liElement.class = 'complete';
  } else {
    liElement.class = 'incomplete';
  }
  textInputElement.type = 'text';
  textInputElement.value = this.userText; // Puts user input into textInput element
  textInputElement.disabled = true;       // Makes textInput element uneditable
  deleteButtonElement.innerHTML = '';     // no text inside the button
  deleteButtonElement.id = 'delete-button';

  // Append the HTML elements in order
  labelElement.appendChild(inputElement);       // puts the input inside the label
  labelElement.appendChild(textInputElement);   //puts the textInput inside the label
  labelElement.appendChild(deleteButtonElement);// puts the button inside the label
  liElement.appendChild(labelElement);          // puts the label inside the li
  return liElement;
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION DECLARATIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Ordered with a stepdown approach. Higher level functions are on top and lower levels below.

// RENDERS CORRECT PAGE
function renderInitialPage() {
  // TODO: if there's local storage, redirect to lists.html
}

// Saves all Lists to local storage
function saveListsToLocalStorage() {
  localStorage.setItem('List.allLists', JSON.stringify(List.allLists));
}

// Removes all Lists from local storage
function removeListsFromLocalStorage() {
  localStorage.clear();
}

// Retrieves all Lists from local storage
function getListsFromLocalStorage() {
  var storedLists = JSON.parse(localStorage.getItem('List.allLists'));
  var storedListTitle = storedLists[0].listTitle;
  var storedListTaskArray = [];
  // Loops through parsed taskList and creates re-constructs each task
  // (Each parsed Task lost its 'Task' class, so they have no prototype methods. By creating new instances, they keep their 'Task' class)
  for (var i = 0; i < storedLists[0].taskList.length; i++) {
    storedListTaskArray.push(new Task(storedLists[0].taskList[i].userText, storedLists[0].taskList[i].checked, storedLists[0].taskList[i].editing, storedLists[0].taskList[i].removed));
  }
  if (storedLists) {
    List.allLists = [];
    new List(storedListTitle, storedListTaskArray);
  }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION INVOCATIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// renderInitialPage(); // TODO: build this function
