'use strict';

import { listItem } from './elements.js';

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
    this.currentList = 'foobar';
    this.listsUl = document.querySelector(listsUlId);
    this.clearButton = document.querySelector(clearButtonId);
    this.addListForm = document.querySelector(addFormId);
    this.newListInput = document.querySelector(listInputId);
    this.currentListName = document.querySelector(currentListNameId);
  }

  getListsFromLocalStorage() {
    this.lists = new Map(
      JSON.parse(localStorage.getItem(this.localStorageKey))
    );
  }
  setListsToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify([...this.lists]));
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
    if (!this.lists.has(list)) {
      this.lists.set(list);
      this.setListsToLocalStorage();
      this.render();
    } else {
      window.alert('That list name already exists. Choose a different name.');
    }
  }
  removeList(list) {
    this.lists.delete(list);
    this.setListsToLocalStorage();
    this.render();
  }
  setCurrentList(list) {
    console.log('setCurrentList', list);
    this.currentList = list;
    this.render();
  }

  render() {
    // Lists and add list form in aside ----------
    this.getListsFromLocalStorage();
    this.addListForm.onsubmit = e => {
      e.preventDefault();
      this.addList(this.newListInput.value);
      this.newListInput.value = '';
    };
    this.clearButton.onclick = e => {
      e.preventDefault();
      this.clearLists();
    };

    this.listsUl.innerHTML = '';
    for (let list of this.lists.keys()) {
      let li = listItem(list);
      li.onclick = e => {
        e.preventDefault();
        console.log('clicked', e.target.innerText);
        this.setCurrentList(e.target.innerText);
      };
      this.listsUl.appendChild(li);
    }

    // Current list section ----------
    this.currentListName.innerHTML = this.currentList;
  }
}

const checkov = new Checkov(
  'checkovLists',
  '#lists-ul',
  '#clear-lists-button',
  '#add-list-form',
  '#new-list-input',
  '#current-list-name'
);
checkov.render();
