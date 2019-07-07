'use strict';

const model = new Model('checkov-mvc');
const view = new View();
const controller = new Controller(model, view);

controller.start();
