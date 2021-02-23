'use strict';
const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

if (localStorage.getItem('todo')) {
  todoData = JSON.parse(localStorage.getItem('todo'));
}

const render = () => {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach((item, i) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = `
    <span class="text-todo">${item.value}</span>
    <div class="todo-buttons">
      <button class="todo-remove"></button>
      <button class="todo-complete"></button>
    </div>
    `;

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoComplete = li.querySelector('.todo-complete');

    btnTodoComplete.addEventListener('click', () => {
      item.completed = !item.completed;
      render();
    })

    const btnTodoRemove = li.querySelector('.todo-remove');

    btnTodoRemove.addEventListener('click', () => {
      todoData.splice(i, 1);
      render();
    })
  })

  localStorage.setItem('todo', JSON.stringify(todoData));
};

todoControl.addEventListener('submit', event => {
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false
  }

  todoData.push(newTodo);

  if (headerInput.value === '' || headerInput.value === null) {
    todoData.pop(newTodo);
  }
  headerInput.value = '';
  render();
});


render();