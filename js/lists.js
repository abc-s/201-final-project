'use strict';

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DATA
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// DOM ACCESS VARIABLES - unique to lists.html
var h1Element = document.getElementById('list-name');
var listTitleInputElement = document.getElementById('list-name-input');
var textInputElement = document.getElementById('text-input');
var addTaskButtonElement = document.getElementById('add-task');
var incompleteUlElement = document.getElementById('incomplete-list');
var completeUlElement = document.getElementById('complete-list');

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION DECLARATIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// RENDER ON PAGE LOAD
function renderOnPageLoad() {
  getListsFromLocalStorage();     // declared in app.js
  renderListName();               // declared below
  List.allLists[0].renderTasks(); // invokes list method that clears page and renders all tasks as li's
}

// RENDER LIST TITLE
function renderListName() {
  listTitleInputElement.value = '';
  listTitleInputElement.value = List.allLists[0].listTitle;
  listTitleInputElement.disabled = true;
  h1Element.appendChild(listTitleInputElement);
}

// EVENT HANDLER FOR 'ADD TASK' BUTTON CLICK
function handleAddTask(event) {
  event.preventDefault();
  var userText = textInputElement.value; // get the user input
  List.allLists[0].addTask(userText);    // create a task with the user input
  List.allLists[0].renderTasks();        // invokes list method that clears page and renders all tasks as li's
}

// EVENT HANDLER FOR 'REMOVED TASK' BUTTON CLICK
function handleRemoveTask(event) {
  event.preventDefault();
  var taskName = event.target.parentNode.innerText;
  var removed = event.target.removed;
  if (removed) {
    for (var i = 0; i < List.allLists[0].taskList.length; i++) {  // Loops through all the tasks
      if (List.allLists[0].taskList[i].userText === taskName) {   // Finds the targeted task
        List.allLists[0].taskList[i].removed = true;              // Changes the task object's property to 'checked'
        console.log(List.allLists[0].taskList[i].userText, 'changed checked to', List.allLists[0].taskList[i].removed);
        List.allLists[0].taskList[i].textContent = '';
        break;
      }
    }
  } else {
    console.log("clicked removed but not possible");
  }
  renderOnPageLoad();
}

// HANDLES CHECKING A TASK'S CHECKBOX
function handleCheckboxChange(event) {
  var taskName = event.target.parentNode.children[1].value;           // gets the value of the label element's 2nd child (the input text element)
  var checked = event.target.checked;                                 // gets checked status of the checkbox
  if (checked) {
    for (var i = 0; i < List.allLists[0].taskList.length; i++) {      // Loops through all the tasks
      if (List.allLists[0].taskList[i].userText === taskName) {       // Finds the targeted task
        List.allLists[0].taskList[i].checked = true;                  // Changes the task object's property to 'checked'
        // Repositions the task to the end of the taskList array
        List.allLists[0].taskList.push(List.allLists[0].taskList[i]); // Adds the task to the end of the allTasks array
        List.allLists[0].taskList.splice(i, 1);                       // Removes the task from it's original position
        break;
      }
    }
  } else {
    for (var i = 0; i < List.allLists[0].taskList.length; i++) {      // Loops through all the tasks
      if (List.allLists[0].taskList[i].userText === taskName) {       // Finds the targeted task
        List.allLists[0].taskList[i].checked = false;                 // Changes the task object's property to 'un-checked'
        // Repositions the task to the end of the taskList array
        List.allLists[0].taskList.push(List.allLists[0].taskList[i]); // Adds the task to the end of the allTasks array
        List.allLists[0].taskList.splice(i, 1);                       // Removes the task from it's original position
        break;
      }
    }
  }
  removeListsFromLocalStorage();
  saveListsToLocalStorage();
  renderOnPageLoad();
}

// 'ADD TASK' BUTTON CLICK EVENT LISTENER
addTaskButtonElement.addEventListener('click', handleAddTask);


// HANDLES DOUBLE-CLICKING A LIST TITLE
function handleEditListTitle() {
  event.target.disabled = false; // Makes the list title editable
}

// HANDLES CLICKING AWAY FROM LIST TITLE
function handleListTitleBlur() {
  event.target.disabled = true;                 // Makes the list title un-editable
  var editedListTitle = event.target.value;     // Grabs the new list title from the page
  List.allLists[0].listTitle = editedListTitle; // Changes the list title object to match the page
  removeListsFromLocalStorage();
  saveListsToLocalStorage();
  renderOnPageLoad();
}

// 'CHECK TASK' EVENT LISTENERS
incompleteUlElement.addEventListener('change', handleCheckboxChange); // listens for checkbox change in 'incomplete' ul
completeUlElement.addEventListener('change', handleCheckboxChange);   // listens for checkbox change in 'complete' ul

// 'EDIT TITLE' EVENT LISTENERS
h1Element.addEventListener('dblclick', handleEditListTitle);          // Fires handler when the list title is double-clicked
listTitleInputElement.addEventListener('blur', handleListTitleBlur);  // Fires handler when the list title input is blurred (focused off of)

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION INVOCATIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

renderOnPageLoad();
