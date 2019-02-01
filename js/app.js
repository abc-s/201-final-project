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
    var newLi = this.taskList[i].createLi();      // create li for each task 
    if (this.taskList[i].checked === false) {     // if task isn't checked, append 'incomplete' ul
      incompleteUlElement.appendChild(newLi);
    } else {                                      // if task is checked, append 'complete' ul
      completeUlElement.appendChild(newLi);
    }
  }
  removeListsFromLocalStorage();  // clear old list from local storage
  saveListsToLocalStorage();      // add the new list to local storage
  textInputElement.value = '';
};

// TASK CONSTRUCTOR FUNCTION
function Task(userText, checked, editing, removed) {
  this.userText = userText;
  this.checked = checked;
  this.editing = editing;
  this.removed = removed;
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
  textInputElement.required = true;       // Add 'required' attribute to task input element for form validation
  
  // Add delete button image
  deleteButtonElement.innerHTML = '<img src="img/delete-button-svgrepo-com.svg" alt="image" id="delete-button" width="30">';        // no text inside the button
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
// Ordered with a stepdown approach. Higher-level functions are on top and lower levels below.

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
  var retrievedLists = JSON.parse(localStorage.getItem('List.allLists'));
  var storedListTitle = retrievedLists[0].listTitle;
  var storedListTaskArray = [];
  // Loops through parsed taskList and re-constructs each task so it retains its 'Task' class and associated prototype methods
  for (var i = 0; i < retrievedLists[0].taskList.length; i++) {
    var reconstructedList = new Task(retrievedLists[0].taskList[i].userText, retrievedLists[0].taskList[i].checked, retrievedLists[0].taskList[i].editing, retrievedLists[0].taskList[i].removed);
    storedListTaskArray.push(reconstructedList);
  }
  if (retrievedLists) {
    List.allLists = [];
    new List(storedListTitle, storedListTaskArray);
  }
}
