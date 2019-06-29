'use strict';

import { listItem } from './elements.js';

class Checkov {
  constructor(
    localStorageKey,
    listsUlId,
    clearButtonId,
    addFormId,
    listInputId
  ) {
    this.localStorageKey = localStorageKey;
    this.lists = new Map();
    this.currentList;
    this.listsUl = document.querySelector(listsUlId);
    this.clearButton = document.querySelector(clearButtonId);
    this.addListForm = document.querySelector(addFormId);
    this.newListInput = document.querySelector(listInputId);
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
    this.renderLists();
  }
  hasList(list) {
    return this.lists.has(list);
  }
  addList(list) {
    if (!this.lists.has(list)) {
      this.lists.set(list);
      this.setListsToLocalStorage();
      this.renderLists();
    } else {
      window.alert('That list name already exists. Choose a different name.');
    }
  }
  removeList(list) {
    this.lists.delete(list);
    this.setListsToLocalStorage();
    this.renderLists();
  }

  renderLists() {
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
      this.listsUl.appendChild(listItem(list));
    }
  }
}

const checkov = new Checkov(
  'checkovLists',
  '#lists-ul',
  '#clear-lists-button',
  '#add-list-form',
  '#new-list-input'
);
checkov.renderLists();
