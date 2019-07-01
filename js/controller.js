'use strict';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  start() {
    this.view.renderLists(this.model.lists);
  }
}
