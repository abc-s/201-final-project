class Task {
  constructor(name, checkOffTask, completed = false, editing = false) {
    this.name = name;
    this.checkOffTask = checkOffTask;
    this.completed = completed;
    this.editing = editing;
  }
  render() {
    // create elements
    let liElement = document.createElement('li');
    let checkboxInputEl = document.createElement('input');
    let textInputEl = document.createElement('input');
    let labelEl = document.createElement('label');
    let deleteButtonEl = document.createElement('button');

    // add attributes
    textInputEl.type = 'text';
    textInputEl.value = this.name;
    textInputEl.disabled = true;
    textInputEl.required = true;
    checkboxInputEl.type = 'checkbox';
    checkboxInputEl.checked = this.completed ? true : false;
    checkboxInputEl.value = this.name;
    checkboxInputEl.checked = this.completed;
    deleteButtonEl.innerHTML = 'delete';
    // add event handlers
    checkboxInputEl.onchange = e => {
      e.preventDefault();
      this.checkOffTask(this.name);
      this.render();
    };

    // assemble
    labelEl.append(checkboxInputEl);
    labelEl.append(textInputEl);
    // labelEl.append(this.name);


    liElement.append(labelEl);
    // liElement.append(textInputEl);
    if(this.completed) liElement.append(deleteButtonEl);

    liElement.class = this.completed ? 'complete' : 'incomplete';

    return liElement;
  }
}

export default class List {
  constructor(name, tasks, fetchLocalStorage, saveLocalStorage) {
    this.name = name;
    this.fetchLocalStorage = fetchLocalStorage;
    this.saveLocalStorage = saveLocalStorage;
    this.tasks = tasks;
    this.listSection = document.querySelector('#current-list-section');
    this.listNameH2 = document.querySelector('#list-name');
    this.addTaskForm = document.querySelector('#add-task-form');
    this.newTaskInput = document.querySelector('#new-task-input');
    this.incompleteListUl = document.querySelector('#incomplete-list');
    this.completedListUl = document.querySelector('#complete-list');
  }
  addTask(task) {
    if (!this.tasks[task]) {
      this.tasks[task] = new Task(task, this.checkOffTask.bind(this));
      this.saveLocalStorage();
    } else {
      window.alert('That task already exists. Name it something else.');
    }
  }
  checkOffTask(task) {
    this.tasks[task].completed = !this.tasks[task].completed;
    this.saveLocalStorage();
    this.render();
  }

  render() {
    // this.fetchLocalStorage();
    this.listNameH2.innerHTML = this.name;

    this.addTaskForm.onsubmit = e => {
      e.preventDefault();
      this.addTask(this.newTaskInput.value);
      this.newTaskInput.value = '';
      this.render();
    };

    this.incompleteListUl.innerHTML = '';
    this.completedListUl.innerHTML = '';
    for (let taskName of Object.keys(this.tasks)) {
      const { name, completed, editing } = this.tasks[taskName];
      this.tasks[taskName] = new Task(name, this.checkOffTask.bind(this), completed, editing);

      let taskEl = this.tasks[taskName].render();
      this.tasks[taskName].completed
        ? this.completedListUl.append(taskEl)
        : this.incompleteListUl.append(taskEl);
    }
  }
}
