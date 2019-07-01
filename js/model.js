'use strict';

export default class Model {
  constructor(name) {
    const localStorage = window.localStorage;
    this.fetchLocalStorage = () => {
      return JSON.parse(localStorage.getItem(name)) || {};
    };

    this.saveLocalStorage = lists => {
      localStorage.setItem(name, JSON.stringify(lists));
    };

    this.lists = [new List('one'), new List('two'), new List('three')];
  }

  getLists() {
    return this.fetchLocalStorage();
  }

  getList(list) {
    let lists = this.fetchLocalStorage();
    return lists[list];
  }

  addList(listName) {
    let lists = this.fetchLocalStorage();
    let list = new List(listName);
    lists[list.id] = list;
    this.saveLocalStorage(lists);
  }

  updateList(list, update) {
    let lists = this.fetchLocalStorage();
    lists[list][update] = update;
    this.saveLocalStorage(lists);
  }

  deleteList(list) {
    let lists = this.fetchLocalStorage();
    delete lists[list];
    this.saveLocalStorage(lists);
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
