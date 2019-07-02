'use strict';

// import Model from './model';

export default class View {
  constructor() {
    this.listsAddForm = document.querySelector('#add-list-form');
    this.newListInputEl = document.querySelector('#new-list-input');
    this.listsUlEl = document.querySelector('#lists-ul');
    this.listsClearButton = document.querySelector('clear-lists-button');
  }
  createListsHTML(lists) {
    let listsArr = Object.entries(lists);
    return listsArr.reduce((html, list) => {
      let [id, listObj] = list;
      return (
        html +
        `
<li id=${id}>
<label>${listObj.name}</label>
<button class="delete-list-button">delete</button>
</li>
      `
      );
    }, '');
  }

  addList(handler) {
    this.listsAddForm.addEventListener('submit', e => {
      e.preventDefault();
      handler(this.newListInputEl.value);
    });
  }

  deleteList(handler) {
    this.listsUlEl.addEventListener('click', e => {
      const delButtons = this.listsUlEl.querySelectorAll('.delete-list-button');
      for (let i = 0; i < delButtons.length; i++) {
        if (delButtons[i] === e.target) return handler(e.target.parentNode.id);
      }
    });
  }

  clearListsAddForm() {
    this.newListInputEl.value = '';
  }

  renderLists(lists) {
    this.listsUlEl.innerHTML = this.createListsHTML(lists);
  }
}
