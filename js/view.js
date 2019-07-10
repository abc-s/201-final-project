'use strict';

class View {
  constructor() {
    this.listsAddForm = document.querySelector('#add-list-form');
    this.newListInputEl = document.querySelector('#new-list-input');
    this.listsUlEl = document.querySelector('#lists-ul');
    this.listsClearButton = document.querySelector('clear-lists-button');

    this.currentListName = document.querySelector('#list-name');
    this.activeListUl = document.querySelector('#active-list');
    this.completeListUl = document.querySelector('#complete-list');
    this.addTaskForm = document.querySelector('#add-task-form');
    this.addTaskInputEl = document.querySelector('#new-task-input');

    this.taskInputs = document.querySelectorAll('.task-input');
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
<button class="delete-list-button">&#215;</button>
</li>
      `
      );
    }, '');
  }
  createTasksHTML(tasks) {
    return tasks.reduce((html, task) => {
      let { id, description, complete, editing } = task;
      //   <input type="checkbox" ${complete ? 'checked' : ''}/>

      return (
        html +
        `
        
<li id=${id} class="task-li ${complete ? 'completed' : ''}">
  <label class="checkbox-container">
    <input type="checkbox" ${complete ? 'checked' : ''}>
    <span class="custom-checkbox"></span>
  </label>
  <input type="text" value="${description}" class="task-input" ${
          !editing ? 'readonly' : ''
        } ${!editing ? 'disabled' : ''}/>
  <button class="delete-task-button">&#215;</button>
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
        if (listLis[i] === e.target) {
          return handler(e.target.id);
        }
        if (listLis[i] === e.target.parentNode) {
          return handler(e.target.parentNode.id);
        }
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
    const checkboxChangeOnTasks = element => {
      element.addEventListener('change', e => {
        if (e.target.type === 'checkbox')
          handler(e.target.parentNode.parentNode.id);
      });
    };
    checkboxChangeOnTasks(this.activeListUl);
    checkboxChangeOnTasks(this.completeListUl);
  }

  saveEditTask(handler) {
    this.activeListUl.addEventListener('focusout', e => {
      let taskInputs = document.querySelectorAll('.task-input');
      for (let i = 0; i < taskInputs.length; i++) {
        if (taskInputs[i] === e.target)
          handler(e.target.parentNode.id, e.target.value);
      }
    });
  }

  deleteTask(handler) {
    this.activeListUl.addEventListener('click', e => {
      if (e.target.type === 'submit') handler(e.target.parentNode.id);
    });
    this.completeListUl.addEventListener('click', e => {
      if (e.target.type === 'submit') handler(e.target.parentNode.id);
    });
  }

  clearAddTaskForm() {
    this.addTaskInputEl.value = '';
  }

  renderLists(lists, currentList) {
    this.listsUlEl.innerHTML = this.createListsHTML(lists);
    if (currentList) this.currentListName.innerHTML = currentList.name;
  }
  renderTasks(currentList) {
    this.currentListName.innerHTML = currentList.name;
    let tasks = currentList.tasks.reduce(
      (acc, task) => {
        task.complete
          ? acc.completeTasks.push(task)
          : acc.activeTasks.push(task);
        return acc;
      },
      {
        activeTasks: [],
        completeTasks: []
      }
    );
    let { activeTasks, completeTasks } = tasks;
    this.activeListUl.innerHTML = this.createTasksHTML(activeTasks);
    // for dblclick events on active tasks
    this.activeListUl.addEventListener('dblclick', e => {
      const taskLis = this.activeListUl.querySelectorAll('.task-li');
      for (let i = 0; i < taskLis.length; i++) {
        if (taskLis[i] === e.target.parentNode) {
          e.target.disabled = false;
          e.target.readOnly = false;
          e.target.focus();
          return;
        }
      }
    });
    this.completeListUl.innerHTML = this.createTasksHTML(completeTasks);
  }
}
