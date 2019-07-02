'use strict';

export default class Model {
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
        name: 'pick a list',
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
  }

  updateList(list, update) {
    let lists = this.getLists();
    lists[list][update] = update;
    this.saveLocalStorage({ lists, currentList: this.data.currentList });
  }

  deleteList(listId) {
    let lists = this.getLists();
    delete lists[listId];
    this.saveLocalStorage({ lists, currentList: this.data.currentList });
  }

  addTask(list, taskDesc) {
    let lists = this.getLists();
    lists[list.id].tasks.push(new Task(taskDesc));
    this.saveLocalStorage({ lists, currentList: lists[list.id] });
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
    this.editing = false;
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
    this.editing = false;
  }

  getTask(taskId) {
    let results = this.tasks.filter(task => task.id === taskId);
    if (results.length > 1) return results;
    if (results.length <= 1) return results[0];
  }

  addTask(taskDescription) {
    this.tasks.push(new Task(taskDescription));
  }

  updateTask(taskId, update) {
    this.tasks = this.tasks.reduce((list, task) => {
      if (task.id === taskId) {
        task[update] = update;
        // task = { ...task, update };
      }
      list.push(task);
    }, []);
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }
}
