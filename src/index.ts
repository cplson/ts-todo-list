import { v4 as uuidV4 } from 'uuid';

// defines a custom type of Task
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
const input = document.querySelector<HTMLInputElement>('#new-task-title');

// getElementById does not take a generic element
// so we need to specify what it should expect using the as keyword
const form = document.getElementById('new-task-form') as HTMLElement | null;

// declare an array of Task types
// and initialize it to what is in the users local storage
// if no tasks exist in local storage initialize to an empty array
const tasks: Task[] = loadTasks(); 

// for every Task in tasks, add it to the task list
tasks.forEach(addListItem);

// event listener to get the input from the user on form submit
form?.addEventListener("submit", e => {
  e.preventDefault();

  // if input exists and input.value is null or an empty string, then return undefined
  if (input?.value == "" || input?.value == null) return

  // declare and initialize newTask of type Task
  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  // add the newTask to the tasks list
  tasks.push(newTask);

  // update the task list in the users local storage
  saveTasks();

  // update the DOM with the updated task
  addListItem(newTask);

  // reset the input field
  input.value = "";
})

// this function takes a task and renders it to the DOM
function addListItem(task: Task) {
  // item is declared as a new li
  const item = document.createElement("li");
  // label is declared as a new label
  const label = document.createElement("label");
  // checkbox is declared as a new input
  const checkbox = document.createElement("input");

  // checkbox is updated to a checkbox type by changing its type property
  checkbox.type = "checkbox";

  // checkbox state is set to the tasks completed property
  checkbox.checked = task.completed;

  // when the checkbox is clicked, update this tasks state and
  // save the state in local storage
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  })

  // append a checkbox and the task.title to the label
  label.append(checkbox, task.title);
  // append that label to the list item
  item.append(label);
  // if the list exists, append the list item to the list
  list?.append(item);
}

// saves tasks to the users local storage
function saveTasks(){
  console.log('inside saveTasks()');
  // stringifys tasks and saves it to local storage using the identifier 'TASKS'
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

// loads the task list from local storage if it exists
// else returns an empty array
function loadTasks(): Task[]{
  // declare and initialize taskJSON to whats stored in the users local storage
  const taskJSON = localStorage.getItem('TASKS');
  // if nothing was stored return an empty array
  if(taskJSON == null) return []
  // else parse taskJSON into JSON and return the result
  return JSON.parse(taskJSON);
}

// this export turns this file into a module
export { };