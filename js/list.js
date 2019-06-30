export default class List {
  constructor(name, tasks) {
    this.name = name;
    this.tasks = tasks;
    this.listSection = document.querySelector('#current-list-section');
    this.listNameH2 = document.querySelector('#list-name');
    this.addTaskForm = document.querySelector('#add-task-form');
    this.newTaskInput = document.querySelector('#new-task-input');
    this.incompleteListUl = document.querySelector('#incomplete-list');
    this.completedListUl = document.querySelector('#complete-list');
  }
  addTask(task) {
    if (!this.tasks.includes(task)) {
      this.tasks.push(task);
    } else {
      window.alert('That task already exists. Name it something else.');
    }
  }

  render() {
    this.listNameH2.innerHTML = this.name;

    this.addTaskForm.onsubmit = e => {
      console.log(this.newTaskInput.value);
      e.preventDefault();
      this.addTask(this.newTaskInput.value);
      this.newTaskInput.value = '';
      this.render();
    };

    this.incompleteListUl.innerHTML = '';
    this.tasks.forEach(task => {
      let item = document.createElement('li');
      item.innerHTML = task;
      this.incompleteListUl.append(item);
    });
  }
}
