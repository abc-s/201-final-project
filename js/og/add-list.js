'use strict';
// app.js corresponds to index.html

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DATA
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// DOM ACCESS VARIABLES - unique to add-list.html
var buttonElement = document.getElementById('add-list');
var listTitleInputElement = document.getElementById('new-title');

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION DECLARATIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// FOCUSES ON INPUT
function focusOnInput() {
  listTitleInputElement.focus();
  listTitleInputElement.select();
}

// BUTTON CLICK EVENT HANDLER
function handleNewList(event) {
  event.preventDefault();
  if (listTitleInputElement.checkValidity()) { // checks if input is valid (based on HTML5 form validation)
    var listTitle = listTitleInputElement.value;   // get what the user typed for 'list name'
    new List(listTitle, []);              // create a new List (pushes to List.allLists array) with the user input and start an empty array of Tasks
    saveListsToLocalStorage();            // save all Lists to local storage
    window.location.href = 'lists.html';  // redirect to lists.html
  } else {
    listTitleInputElement.reportValidity(); // returns false if input is invalid, shows HTML5 form validation error to user
  }
}

// BUTTON CLICK EVENT LISTENER
buttonElement.addEventListener('click', handleNewList);

// REDIRECT TO LISTS.HTML IF A LIST ALREADY EXISTS
function renderInitialPage() {
  if (localStorage.getItem('List.allLists')) {
    window.location.href = 'lists.html';
  }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION INVOCATIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

focusOnInput();
renderInitialPage();
