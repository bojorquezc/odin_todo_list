import { todoItem, todoProjects } from "./todo_manager";
import { displayTodo, refreshDisplay, displayProjectButtons } from "./todo_display";

const formTitle = document.querySelector('.form-title');
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
    const taskID = Date.now().toString();

    const newTask = todoItem(taskName, taskDescription, dueDate, priority, project, taskID);
    newTask.createToDo();
    generalReset();

    console.log(newTask.taskName);
    console.log(todoProjects);
}

function editButtonAddListener() {
    const editButtons = document.querySelectorAll('.edit_button')
    editButtons.forEach((button) => {
        button.addEventListener('click', editFilter)
    });
}

function editFilter() {
    for (const projectArray in todoProjects) {
        const dataSetProject = this.dataset.project;
        const dataSetTaskName = this.dataset.taskName;
        const array = todoProjects[projectArray];

        for (let i = 0; i < array.length; i++) {
            if (projectArray === dataSetProject && array[i].taskName === dataSetTaskName) {

                formTitle.textContent = 'Edit Task';
                submitModalBtn.textContent = 'Edit Task';

                taskNameField.value = array[i].taskName;
                taskDescField.value = array[i].taskDescription;
                taskDueDate.value = array[i].dueDate;
                taskPriority.value = array[i].priority;
                taskProject.value = array[i].project;
                
                showModal();
            }
        }
    }
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

export { showModal, hideModal, pushToDo, editButtonAddListener }

