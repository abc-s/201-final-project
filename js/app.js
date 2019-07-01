'use strict';

import { listItem } from './elements.js';
import List from './list.js';

class Checkov {
  constructor(
    localStorageKey,
    listsUlId,
    clearButtonId,
    addFormId,
    listInputId,
    currentListNameId
  ) {
    this.localStorageKey = localStorageKey;
    this.lists = new Map();
    this.currentList = null;
    this.listsUl = document.querySelector(listsUlId);
    this.clearButton = document.querySelector(clearButtonId);
    this.addListForm = document.querySelector(addFormId);
    this.newListInput = document.querySelector(listInputId);
    this.currentListName = document.querySelector(currentListNameId);
  }

  fetchLocalStorage() {
    this.lists = new Map(
      JSON.parse(localStorage.getItem(this.localStorageKey))
    );
    this.currentList = JSON.parse(localStorage.getItem('checkov-current'));
  }
  saveLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify([...this.lists]));
    localStorage.setItem('checkov-current', JSON.stringify(this.currentList));
  }
  clearLists() {
    this.lists.clear();
    this.currentList = null;
    this.saveLocalStorage();
  }
  hasList(list) {
    return this.lists.has(list);
  }
  addList(list) {
    if (!this.lists.has(list)) {
      this.lists.set(
        list,
        new List(
          list,
          {},
          this.fetchLocalStorage.bind(this),
          this.saveLocalStorage.bind(this)
        )
      );
      this.setCurrentList(list);
      this.saveLocalStorage();
    } else {
      window.alert('That list name already exists. Choose a different name.');
    }
  }
  removeList(list) {
    this.lists.delete(list);
    this.saveLocalStorage();
  }
  setCurrentList(list) {
    this.currentList = list;
    this.saveLocalStorage();
  }

  render() {
    // Always retrieve data from local storage
    this.fetchLocalStorage();

    // on submit/click event handlers
    this.addListForm.onsubmit = e => {
      e.preventDefault();
      this.addList(this.newListInput.value);
      this.newListInput.value = '';
      this.render();
    };
    this.clearButton.onclick = e => {
      e.preventDefault();
      this.clearLists();
      this.render();
    };

    // clear
    this.listsUl.innerHTML = '';

    // fill
    for (let list of this.lists.keys()) {
      let li = listItem(list);
      // set current list event
      li.onclick = e => {
        e.preventDefault();
        this.setCurrentList(e.target.innerText);
        this.render();
      };
      this.listsUl.appendChild(li);
    }

    // Current list section ----------
    if (this.currentList) {
      // console.log(this.lists.get(this.currentList));
      const {name, tasks} = this.lists.get(this.currentList);
      // console.log(this.lists);

      new List(
        name,
        tasks,
        this.fetchLocalStorage.bind(this),
        this.saveLocalStorage.bind(this)
      ).render();
    }
  }
}

const checkov = new Checkov(
  'checkov',
  '#lists-ul',
  '#clear-lists-button',
  '#add-list-form',
  '#new-list-input',
  '#current-list-name'
);
checkov.render();
