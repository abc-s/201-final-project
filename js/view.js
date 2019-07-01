'use strict';

// import Model from './model';

export default class View {
  constructor() {
    this.listsAddForm = document.querySelector('#add-list-form');
    this.listsUlEl = document.querySelector('#lists-ul');
    this.listsClearButton = document.querySelector('clear-lists-button');
  }
  createListsHTML(lists) {
    return lists.reduce((html, list) => {
      return (
        html +
        `
<li>
<input type="checkbox" />
<label>${list.name}</label>
<button>delete</button>
</li>
      `
      );
    }, '');
  }

  renderLists(lists) {
    this.listsUlEl.innerHTML = this.createListsHTML(lists);
  }
}
