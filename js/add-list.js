'use strict';
// app.js corresponds to index.html

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DATA
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// DOM ACCESS VARIABLES
var buttonElement = document.getElementById('add-list');
var inputElement = document.getElementById('new-title');

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION DECLARATIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Ordered with a stepdown approach. Higher level functions are on top and lower levels below.

// BUTTON CLICK EVENT HANDLER
function handleNewList(event) {
  console.log('event.target:', event.target);
  event.preventDefault();
  var listTitle = inputElement.value;
  console.log(listTitle);
  new List(listTitle, []);
  saveListsToLocalStorage();

  window.location.href = 'lists.html'; // redirect to lists.html
}

// BUTTON CLICK EVENT LISTENER
buttonElement.addEventListener('click', handleNewList);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION INVOCATIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
