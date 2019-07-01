'use strict';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.addList(this.addList.bind(this));
  }

  addList(listName) {
    console.log('controller');
    this.model.addList(listName);
    this.view.clearListsAddForm();
    this.view.renderLists(this.model.getLists())
  }

  start() {
    this.view.renderLists(this.model.getLists());
  }
}
