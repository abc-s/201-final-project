'use strict';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.lists = this.model.lists();

    view.addList(this.addList.bind(this));
    view.deleteList(this.deleteList.bind(this));
  }

  addList(listName) {
    // update the model (and localStorage)
    this.model.addList(listName);

    // update the view
    this.view.clearListsAddForm();
    this.view.renderLists(this.lists());
  }

  deleteList(listId) {
    this.model.deleteList(listId);
    this.view.renderLists(this.lists());
  }

  start() {
    console.log(this.lists);
    this.view.renderLists(this.lists());
  }
}
