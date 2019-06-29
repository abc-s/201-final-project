const LIST_NAME = 'checkovLists';

// Check for checkov lists in local storage; add object to local storage if none exists
if (!localStorage.getItem(LIST_NAME)) {
  localStorage.setItem(LIST_NAME, JSON.stringify({}));
}

class Checkov {
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.lists = new Map();
    this.currentList;
    this.listsUl = document.querySelector('#lists');
    this.clearButton = document.querySelector('#clear-lists-button');
    // this.clearButton.onclick(this.clearLists());
    console.log(this.clearButton);
  }
  getListsFromLocalStorage() {
    this.lists = JSON.parse(localStorage.getItem(this.localStorageKey));
  }
  setListsToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.lists));
  }
  clearLists() {
    this.lists.clear();
    this.setListsToLocalStorage();
    this.render();
  }
  hasList(list) {
    return this.lists.has(list);
  }
  addList(list) {
    if (this.list.has(list)) {
      this.lists.set(list);
      this.setListsToLocalStorage();
      this.render();
    }
  }
  removeList(list) {
    this.lists.delete(list);
    this.setListsToLocalStorage();
    this.render();
  }
  render() {
    this.listsUl.innerHTML = '';
    // console.log(this.lists.keys())
    for (let list of this.lists.keys()) {
      let liElement = document.createElement('li');
      liElement.textContent = list;
      this.listsUl.appendChild(liElement);
    }
    // this.lists.keys().forEach(list => {
    //   let liElement = document.createElement('li');
    //   liElement.textContent = list;
    //   this.listsUl.appendChild(liElement);
    // });
  }
}

// ------------------------------------------------------------

// Render list of lists
// const listsUl = document.querySelector('#lists');

// function renderLists() {
//   console.dir(listsUl);
//   Object.keys(getLists()).forEach(list => {
//     let liElement = document.createElement('li');
//     liElement.textContent = list;
//     if (listsUl.contains(liElement)) console.log('contains: ', liElement);
//     listsUl.appendChild(liElement);
//   });
// }

// // Clear all lists
// const clearButton = document.querySelector('#clear-lists-button');
// clearButton.onclick = () => {
//   clearLists();
//   // renderLists();
// };

// // Add list form
// var newListForm = document.querySelector('#new-list-form');
// var listNameInputEl = document.querySelector('#new-list-name');
// newListForm.addEventListener('submit', function addNewList(e) {
//   e.preventDefault();
//   addList(listNameInputEl.value);
//   renderLists();
// });

// function addNewList(e) {
//   e.preventDefault();
//   addList(listNameInputEl.value);
// }

// fillParentNode(listsUl, createLiElementsArray(getListNamesArray()));

// // Populates current lists list
// function renderLists(arr) {
//   console.log(typeof listsUl);
//   for (var i = 0; i < arr.length; i++) {
//     var someList = document.createElement('li');
//     someList.textContent = arr[i];
//     listsUl.appendChild(someList);
//   }
// }

// var newListForm = document.querySelector('#new-list-form');
// var listNameInputEl = document.querySelector('#new-list-name');
// newListForm.addEventListener('submit', addNewList);

// var lists = ['list one', 'list two', 'list three', 'and another list'];

// Saves new list to local storage
// function addNewList(e) {
//   e.preventDefault();
//   var newListName = listNameInputEl.value;
//   var currentLists = JSON.parse(localStorage.getItem(LIST_NAME));
//   if (currentLists[newListName]) {
//     window.alert('List already exists');
//   } else {
//     currentLists[newListName] = [];
//     localStorage.setItem(LIST_NAME, JSON.stringify(currentLists));
//   }
//   listNameInputEl.value = '';
//   // console.log(localStorage.getItem(LIST_NAME));
//   renderLists(Object.keys(JSON.parse(localStorage.getItem(LIST_NAME))));
// }

// renderLists(lists);

// function handleNewList(event) {
//   event.preventDefault();
//   if (listTitleInputElement.checkValidity()) { // checks if input is valid (based on HTML5 form validation)
//     var listTitle = listTitleInputElement.value;   // get what the user typed for 'list name'
//     new List(listTitle, []);              // create a new List (pushes to List.allLists array) with the user input and start an empty array of Tasks
//     saveListsToLocalStorage();            // save all Lists to local storage
//     window.location.href = 'lists.html';  // redirect to lists.html
//   } else {
//     listTitleInputElement.reportValidity(); // returns false if input is invalid, shows HTML5 form validation error to user
//   }
// }

// renderLists();
const checkov = new Checkov('checkovLists');
checkov.render();
