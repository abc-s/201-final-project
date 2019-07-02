'use strict';

// import Model from './model';

export default class View {
  constructor() {
    this.listsAddForm = document.querySelector('#add-list-form');
    this.newListInputEl = document.querySelector('#new-list-input');
    this.listsUlEl = document.querySelector('#lists-ul');
    this.listsClearButton = document.querySelector('clear-lists-button');

    this.currentListName = document.querySelector('#list-name');
    this.activeListUl = document.querySelector('#active-list');
    // this.completeListUl = document.querySelector('#complete-list');
    this.addTaskForm = document.querySelector('#add-task-form');
    this.addTaskInputEl = document.querySelector('#new-task-input');
  }
  createListsHTML(lists) {
    let listsArr = Object.entries(lists);
    return listsArr.reduce((html, list) => {
      let [id, listObj] = list;
      return (
        html +
        `
<li id=${id} class="list-li">
<label>${listObj.name}</label>
<button class="delete-list-button">delete</button>
</li>
      `
      );
    }, '');
  }
  createTasksHTML(tasks) {
    return tasks.reduce((html, task) => {
      let { id, description, complete, editing } = task;
      return (
        html +
        `
<li id=${id} class="task-li ${complete ? ''}">
  <input type="checkbox" ${complete ? 'checked' : ''}/>
  <input type="text" value="${description}" readonly />
  <button class="delete-task-button">delete</button>
</li>
      `
      );
    }, '');
  }

  addList(handler) {
    this.listsAddForm.addEventListener('submit', e => {
      e.preventDefault();
      handler(this.newListInputEl.value);
    });
  }

  deleteList(handler) {
    this.listsUlEl.addEventListener('click', e => {
      const delButtons = this.listsUlEl.querySelectorAll('.delete-list-button');
      for (let i = 0; i < delButtons.length; i++) {
        if (delButtons[i] === e.target) return handler(e.target.parentNode.id);
      }
    });
  }

  selectList(handler) {
    this.listsUlEl.addEventListener('click', e => {
      const listLis = this.listsUlEl.querySelectorAll('.list-li');
      for (let i = 0; i < listLis.length; i++) {
        if (listLis[i] === e.target) return handler(e.target.id);
      }
    });
  }

  clearListsAddForm() {
    this.newListInputEl.value = '';
  }

  addTask(handler) {
    this.addTaskForm.addEventListener('submit', e => {
      e.preventDefault();
      handler(this.addTaskInputEl.value);
    });
  }

  completeTask(handler) {
    this.activeListUl.addEventListener('change', e => {
      const taskLis = this.activeListUl.querySelectorAll('.task-li');
      for (let i = 0; i < taskLis.length; i++) {
        if (taskLis[i] === e.target.parentNode)
          return handler(e.target.parentNode.id);
      }
    });
  }

  clearAddTaskForm() {
    this.addTaskInputEl.value = '';
  }

  renderLists(lists) {
    this.listsUlEl.innerHTML = this.createListsHTML(lists);
  }
  renderTasks(currentList) {
    this.currentListName.innerHTML = currentList.name;
    this.activeListUl.innerHTML = this.createTasksHTML(currentList.tasks);
  }
}
