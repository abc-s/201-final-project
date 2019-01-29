'use strict';
// app.js is global and linked to each html file

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DATA
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//OBJECT CONSTRUCTOR VARIABLES
List.allLists = [];

// LIST CONSTRUCTOR FUNCTION
function List(listTitle, taskList) {
  this.listTitle = listTitle;
  this.taskList = taskList;
  List.allLists.push(this);
  console.log('created new List instance');
}

// LIST PROTOTYPE FUNCTIONS
// Adds a Task to a List, pushes Task to array within the List
List.prototype.addTask = function (userText) {
  var task = new Task(userText);
  this.taskList.push(task);
  console.log('ran .addTask()');
};

// Renders tasks to the DOM
List.prototype.renderTasks = function () {
  for (var i = 0; i < this.taskList.length; i++) {
    var newLi = this.taskList[i].createLi();
    if (this.taskList[i].checked === false) {
      incompleteUlElement.appendChild(newLi);
    } else {
      completeUlElement.appendChild(newLi);
    }
  }
};

// Saves a List to local storage
List.prototype.saveListToLocalStorage = function () {
  localStorage.setItem(this.listTitle, JSON.stringify(this));
};

// Removes a List from local storage
List.prototype.removeListFromLocalStorage = function () {
  localStorage.removeItem(this.listTitle);
};


// TASK CONSTRUCTOR FUNCTION
function Task(userText) {
  this.userText = userText;
  this.checked = false;
  this.editing = false;
  this.removed = false;
  console.log('created new Task instance');
}

Task.prototype.createLi = function () {
  var liElement = document.createElement('li');
  var labelElement = document.createElement('label');
  var inputElement = document.createElement('input');
  var buttonElement = document.createElement('button');

  inputElement.innerHTML = this.userText;
  inputElement.type = 'checkbox';
  if (this.checked === true) {
    inputElement.checked = 'checked';
    liElement.class = 'complete';
  } else {
    liElement.class = 'incomplete';
  }

  buttonElement.innerHTML = 'X';
  labelElement.appendChild(inputElement);
  labelElement.appendChild(buttonElement);
  liElement.appendChild(labelElement);

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

// // BUTTON CLICK EVENT HANDLER
// function handleNewList(event) {
//   console.log('event.target:', event.target);
//   event.preventDefault();
//   var listTitle = inputElement.value;
//   console.log(listTitle);
//   new List(listTitle, []);
//   // window.location.href = 'lists.html'; // redirect to lists.html
// }

// // BUTTON CLICK EVENT LISTENER
// buttonElement.addEventListener('click', handleNewList);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION INVOCATIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

renderInitialPage();
