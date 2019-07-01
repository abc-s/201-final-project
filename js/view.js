'use strict';

import Model from './model';

export default class View {
  constructor() {
    this.listsAddForm = document.querySelector('#add-list-form');
    this.listsUlEl = document.querySelector('#lists-ul');
    this.listsClearButton = document.querySelector('clear-lists-button');
  }
}