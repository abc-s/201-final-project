'use strict';

class Model {
  constructor(name) {
    const localStorage = window.localStorage;
    this.fetchLocalStorage = () => JSON.parse(localStorage.getItem(name)) || {};

    this.saveLocalStorage = data =>
      localStorage.setItem(name, JSON.stringify(data));

    this.data = {
      lists: {},
      currentList: null
    };
    this.lists = () => this.getLists.bind(this);
    this.currentList = () => this.getCurrentList.bind(this);
  }

  getLists() {
    return this.fetchLocalStorage().lists || {};
  }

  getList(list) {
    let lists = this.getLists();
    return lists[list];
  }

  getCurrentList() {
    return (
      this.fetchLocalStorage().currentList || {
        name: 'select or add a list',
        tasks: [],
        id: 0
      }
    );
  }

  setCurrentList(listId) {
    let lists = this.getLists();
    let currentList = lists[listId];
    this.saveLocalStorage({ lists, currentList });
  }

  addList(listName) {
    let lists = this.getLists();
    let list = new List(listName);
    lists[list.id] = list;
    this.saveLocalStorage({ lists, currentList: list });
    return list.id;
  }

  updateList(list, update) {
    let lists = this.getLists();
    lists[list][update] = update;
    this.saveLocalStorage({ lists, currentList: this.data.currentList });
  }

  deleteList(listId) {
    let lists = this.getLists();
    delete lists[listId];
    this.saveLocalStorage({ lists, currentList: lists[Object.keys(lists)[0]] });
  }

  addTask(list, taskDesc) {
    let lists = this.getLists();
    lists[list.id].tasks.push(new Task(taskDesc));
    this.saveLocalStorage({ lists, currentList: lists[list.id] });
  }

  completeTask(list, taskId) {
    let lists = this.getLists();
    let idx = list.tasks.findIndex(task => task.id === taskId);
    lists[list.id].tasks[idx].complete = !lists[list.id].tasks[idx].complete;
    this.saveLocalStorage({ lists, currentList: lists[list.id] });
  }

  saveEditTask(list, taskId, newTaskDesc) {
    let lists = this.getLists();
    let idx = list.tasks.findIndex(task => task.id === taskId);
    lists[list.id].tasks[idx].description = newTaskDesc;
    this.saveLocalStorage({ lists, currentList: lists[list.id] });
  }

  deleteTask(list, taskId) {
    let lists = this.getLists();
    let idx = list.tasks.findIndex(task => task.id === taskId);
    lists[list.id].tasks.splice(idx, 1);
    this.saveLocalStorage({ lists, currentList: lists[list.id]});
  }
}

class Task {
  constructor(description) {
    this.id =
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9);
    this.description = description;
    this.complete = false;
  }
}

class List {
  constructor(name) {
    this.id =
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9);
    this.name = name;
    this.tasks = [];
    this.complete = false;
  }
}
