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
<button>delete</button>
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

  clearListsAddForm() {
    this.newListInputEl.value = '';
  }

  renderLists(lists) {
    this.listsUlEl.innerHTML = this.createListsHTML(lists);
    // this.addListEventListener(this.listsAddForm, 'submit', (e) => {
    //   e.preventDefault();
    //   console.log('submitted', this.newListInputEl.value);
    //   return this.newListInputEl.value;
    // });
  }
}
