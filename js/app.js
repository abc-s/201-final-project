'use strict';
// app.js is global and linked to each html file

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DATA
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//GLOBAL VARIABLES
List.allLists = []; // Array to store all lists
var buttonElement;

// LIST CONSTRUCTOR FUNCTION
function List(listTitle, taskList) {
  this.listTitle = listTitle;
  this.taskList = taskList;
  List.allLists.push(this);
}

// LIST PROTOTYPE FUNCTIONS
// Adds a Task to a List, pushes Task to array within the List
List.prototype.addTask = function (userText) {
  var task = new Task(userText);
  this.taskList.push(task);
};

// Renders tasks to the DOM
List.prototype.renderTasks = function () {
  // Make lists empty on page
  incompleteUlElement.innerHTML = '';
  completeUlElement.innerHTML = '';
  // Loop through the tasks
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
function Task(userText) {
  this.userText = userText;
  this.checked = false;
  this.editing = false;
  this.removed = false;
  // console.log('created new Task instance');
}

// TASK PROTOTYPE FUNCTION - creates HTML elements for each task
Task.prototype.createLi = function () {
  // Create HTML elements for each task
  var liElement = document.createElement('li');
  var labelElement = document.createElement('label');
  var inputElement = document.createElement('input');
  buttonElement = document.createElement('button');
  // Give each task's HTML elements content
  labelElement.innerHTML = this.userText;
  inputElement.type = 'checkbox';
  if (this.checked === true) {
    inputElement.checked = 'checked';
    liElement.class = 'complete';
  } else {
    liElement.class = 'incomplete';
  }
  // Append the HTML elements in order
  buttonElement.innerHTML = '';             // no text inside the button
  labelElement.appendChild(inputElement);   // puts the input inside the label
  labelElement.appendChild(buttonElement);  // puts the button inside the label
  liElement.appendChild(labelElement);      // puts the label inside the li

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
  localStorage.removeItem('List.allLists');
}

// Retrieves all Lists from local storage
function getListsFromLocalStorage() {
  var storedLists = JSON.parse(localStorage.getItem('List.allLists'));
  if (storedLists) {
    new List(storedLists[0].listTitle, storedLists[0].taskList);
  }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION INVOCATIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// renderInitialPage(); // TODO: build this function
