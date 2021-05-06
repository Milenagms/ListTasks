const inputNewTask = document.querySelector('.inputNewTask');
const btnAddTesk = document.querySelector('.btnAddTesk');
const tasks = document.querySelector('.tasks');

function createLi(){
  const li =document.createElement('li');
  return li;
}
inputNewTask.addEventListener('keypress', function(e){
  if (e.keyCode === 13){
    if(!inputNewTask.value) return;
    createTask(inputNewTask.value);
  }
});

function cleanInput(){
  inputNewTask.value = '';
  inputNewTask.focus();
}

function createDeleteButton(li) {
  li.innerText += ' ';
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Apagar';
  li.appendChild(deleteButton);
  deleteButton.setAttribute('class', 'Apagar');
  deleteButton.setAttribute('title', 'Apagar esta tarefa');
  li.appendChild(deleteButton);
}

function createTask(textInput) {
  const li = createLi();
  li.innerText = textInput
  tasks.appendChild(li);
  cleanInput();
  createDeleteButton(li);
  saveTask();
}

btnAddTesk.addEventListener('click', function(){
  if (!inputNewTask) return;
  createTask(inputNewTask.value);
});

document.addEventListener('click', function(e){
  const el = e.target;
console.log(el)
  if (el.classList.contains('Apagar')){
    el.parentElement.remove();
    saveTask();
  }
});

function saveTask(){
  const liTasks = tasks.querySelectorAll('li');
  const listTasks = [];

  for (let task of liTasks){
    let textTasks = task.innerText;
    textTasks = textTasks.replace('Apagar', '').trim();
    listTasks.push(textTasks);
  }

  const tasksJSON = JSON.stringify(listTasks);
  localStorage.setItem('tasks',  tasksJSON);
}

function addSaveTasks(){
  const tasks = localStorage.getItem('tasks');
  const listTasks = JSON.parse(tasks);

  for (let tasks of listTasks){
    createTask(tasks)

  }
}
addSaveTasks();

