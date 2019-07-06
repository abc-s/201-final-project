'use strict';

// export default 
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.lists = this.model.lists();
    this.currentList = this.model.currentList();

    view.addList(this.addList.bind(this));
    view.deleteList(this.deleteList.bind(this));
    view.selectList(this.selectList.bind(this));
    view.addTask(this.addTask.bind(this));
    view.completeTask(this.completeTask.bind(this));
    view.saveEditTask(this.saveEditTask.bind(this));
    view.deleteTask(this.deleteTask.bind(this));
  }

  addList(listName) {
    let listId = this.model.addList(listName);
    this.view.clearListsAddForm();
    this.view.renderLists(this.lists());
    this.selectList(listId);
  }

  deleteList(listId) {
    this.model.deleteList(listId);
    this.view.renderLists(this.lists(), this.currentList());
  }

  selectList(listId) {
    this.model.setCurrentList(listId);
    this.view.renderTasks(this.currentList());
  }

  addTask(taskDesc) {
    this.model.addTask(this.currentList(), taskDesc);
    this.view.clearAddTaskForm();
    this.view.renderTasks(this.currentList());
  }

  completeTask(taskId) {
    this.model.completeTask(this.currentList(), taskId);
    this.view.renderTasks(this.currentList());
  }

  saveEditTask(taskId, newTaskDesc) {
    this.model.saveEditTask(this.currentList(), taskId, newTaskDesc);
    this.view.renderTasks(this.currentList());
  }

  deleteTask(taskId){
    this.model.deleteTask(this.currentList(), taskId);
    this.view.renderTasks(this.currentList());
  }

  start() {
    this.view.renderLists(this.lists());
    this.view.renderTasks(this.currentList());
  }
}
