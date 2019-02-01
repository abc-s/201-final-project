'use strict';

// +++++++++++++++++++++++++++++++++++++++++++++
// DATA
// +++++++++++++++++++++++++++++++++++++++++++++

// DOM ACCESS VARIABLES - unique to lists.html
var h1Element = document.getElementById('list-name');
var listTitleInputElement = document.getElementById('list-name-input');
var textInputElement = document.getElementById('text-input');
var addTaskButtonElement = document.getElementById('add-task');
var incompleteUlElement = document.getElementById('incomplete-list');
var completeUlElement = document.getElementById('complete-list');
var deleteTaskButtonElement = document.getElementById('delete-button');

// +++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION DECLARATIONS
// +++++++++++++++++++++++++++++++++++++++++++++

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
function handleDeleteTask(event) {
  console.log(event);
  if(event.target.id === 'delete-button' || event.target.id === ('delete-button-image')){
    //console.log('deletetask event fired');
    event.preventDefault();
    //console.log(event);
    //console.log(event.target);
    var taskName = event.target.parentNode.previousSibling.value;
    console.log(taskName);

    for(var i=0; i < List.allLists[0].taskList.length; i++){
      if(List.allLists[0].taskList[i].userText === taskName){
        List.allLists[0].taskList.splice(i, 1);
      }
    }

    // var removed = event.target.removed;
    // if (removed) {
    //   for (var i = 0; i < List.allLists[0].taskList.length; i++) {  // Loops through all the tasks
    //     if (List.allLists[0].taskList[i].userText === taskName) {   // Finds the targeted task
    //       List.allLists[0].taskList[i].removed = true;              // Changes the task object's property to 'checked'
    //       console.log(List.allLists[0].taskList[i].userText, 'changed checked to', List.allLists[0].taskList[i].removed);
    //       List.allLists[0].taskList[i].textContent = '';
    //       break;
    //     }
    //   }
    // } else {
    //   console.log("clicked removed but not possible");
    // }
    removeListsFromLocalStorage();
    saveListsToLocalStorage();
    renderOnPageLoad();
  }
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
function handleEditListTitle(event) {
  event.target.disabled = false; // Makes the list title editable
}

// HANDLES CLICKING AWAY FROM LIST TITLE
function handleListTitleBlur(event) {
  event.target.disabled = true;                 // Makes the list title uneditable
  var editedListTitle = event.target.value;     // Grabs the new list title from the page
  List.allLists[0].listTitle = editedListTitle; // Changes the list title object to match the page
  removeListsFromLocalStorage();
  saveListsToLocalStorage();
  renderOnPageLoad();
}

// HANDLES DOUBLE-CLICKING A TASK
var lastEditedTaskValue;                      // Variable to store the input value when a task is clicked into
var lastEditedTaskInputElement;               // Variable to store the input element clicked into
function handleEditTask(event) {
  lastEditedTaskValue = event.target.value;   // Assigns value to variables above
  lastEditedTaskInputElement = event.target;
  event.target.disabled = false;              // Makes the task editable
  lastEditedTaskInputElement.addEventListener('blur', handleEditTaskBlur);  // Starts listening for blur of current task (focused off of)
}

// HANDLES CLICKING AWAY FROM EDITED TASK
function handleEditTaskBlur(event) {
  event.target.disabled = true;
  var newEditedTaskValue = event.target.value;                             // Grabs the new task content from the page
  if (lastEditedTaskValue !== newEditedTaskValue) {                        // Runs the rest of the function only if task value changed
    console.log('content changed');
    for (var i = 0; i < List.allLists[0].taskList.length; i++) {           // Loops through all the tasks
      if (List.allLists[0].taskList[i].userText === lastEditedTaskValue) { // Finds the targeted task
        List.allLists[0].taskList[i].userText = newEditedTaskValue;        // Changes the task object's userText to the new value
        break;
      }
    }      
  }
  lastEditedTaskInputElement.removeEventListener('blur', handleEditTaskBlur); // Stops listening for blur of current task
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

// 'EDIT TASK' EVENT LISTENER
incompleteUlElement.addEventListener('dblclick', handleEditTask); // Listens for double-click in 'incomplete' ul

//REMOVE TASK EVENT LISTENER
incompleteUlElement.addEventListener('click', handleDeleteTask);
completeUlElement.addEventListener('click', handleDeleteTask);

// +++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION INVOCATIONS
// +++++++++++++++++++++++++++++++++++++++++++++

renderOnPageLoad();
