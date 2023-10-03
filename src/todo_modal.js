import { todoItem, todoProjects } from "./todo_manager";
import { displayTodo, refreshDisplay, displayProjectButtons } from "./todo_display";

const addNewTaskBtn = document.querySelector('.add_task_button');
const closeModalBtn = document.querySelector('.close_modal')
const submitModalBtn = document.querySelector('.submit_btn');
const taskModal = document.querySelector('.modal');

const taskNameField = document.querySelector('#taskName');
const taskDescField = document.querySelector('#taskDesc');
const taskDueDate = document.querySelector('#dueDate');
const taskPriority = document.querySelector('#priority');
const taskProject = document.querySelector('#project');
const addTaskForm = document.querySelector('.add_task_form');

function showModal() {
    taskModal.style.display = 'block';
}

function hideModal() {
    taskModal.style.display = 'none';
}

function pushToDo() {
    const taskName = taskNameField.value;
    const taskDescription = taskDescField.value;
    const dueDate = taskDueDate.value;
    const priority = taskPriority.value;
    const project = taskProject.value;

    const newTask = todoItem(taskName, taskDescription, dueDate, priority, project);
    newTask.createToDo();
    generalReset();

    console.log(newTask.taskName);
    console.log(todoProjects);
}

function generalReset() {
    addTaskForm.reset();
    hideModal();
    refreshDisplay();
    displayTodo();
    displayProjectButtons();
}

addNewTaskBtn.addEventListener('click', showModal);
closeModalBtn.addEventListener('click', hideModal);
submitModalBtn.addEventListener('click', pushToDo);
// submitModalBtn.addEventListener('submit', (e) => {
//     e.preventDefault();
// })

export { showModal, hideModal, pushToDo }

