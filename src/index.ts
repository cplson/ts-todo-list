import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

// querySelector grabs an element that is of id=list
// <HTMLUListElement> specifies that the querySelector function
// should return an UL HTML element
const list = document.querySelector<HTMLUListElement>('#list');

// getElementById does not take a generic element
// so we need to specify what it should expect using the as keyword
const form = document.getElementById('new-task-form') as HTMLElement | null;
const input = document.querySelector<HTMLInputElement>('#new-task-title');

const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);
// event listener to get the input from the user on form submit
form?.addEventListener("submit", e => {
  e.preventDefault();


  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  tasks.push(newTask);
  saveTasks();
  
  addListItem(newTask);
  input.value = "";
})

function addListItem(task: Task) {
  console.log('inside addListItem()');
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  })
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks(){
  console.log('inside saveTasks()');
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[]{
  console.log('inside loadTasks()');
  const taskJSON = localStorage.getItem('TASKS');
  console.log(taskJSON);
  if(taskJSON == null) return []
  return JSON.parse(taskJSON);
}

export { };