import { v4 as uuidv4 } from 'uuid';
import { todoItem, todoProjects} from "./todo_manager";
import { displayTodo, refreshDisplay, displayProjectButtons } from "./todo_display";

const formTitle = document.querySelector('.form-title');
const addNewTaskBtn = document.querySelector('.add_task_button');
const closeModalBtn = document.querySelector('.close_modal')
const submitModalBtn = document.querySelector('.submit_btn');
const editModalBtn = document.querySelector('.edit_btn');
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
    resetForm();
}

function resetForm() {
    addTaskForm.reset();
    formTitle.textContent = 'Add a new task';
    submitModalBtn.textContent = 'Submit New Task';

}

function pushToDo() {
    const taskName = taskNameField.value;
    const taskDescription = taskDescField.value;
    const dueDate = taskDueDate.value;
    const priority = taskPriority.value;
    const project = taskProject.value;
    const taskID = uuidv4();

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
        const dataSetTaskId = this.dataset.taskId;
        const array = todoProjects[projectArray];

        for (let i = 0; i < array.length; i++) {
            if (projectArray === dataSetProject && array[i].taskID === dataSetTaskId) {

                formTitle.textContent = 'Edit Task';
                submitModalBtn.textContent = 'Edit Task';
                submitModalBtn.dataset.project = dataSetProject;
                submitModalBtn.dataset.taskId = dataSetTaskId;

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

function editToDo() {
    const dataSetProject = submitModalBtn.dataset.project;
    const dataSetTaskId = submitModalBtn.dataset.taskId;
    for (const projectArray in todoProjects) {
        const array = todoProjects[projectArray];

        for (let i = 0; i < array.length; i++) {
            if (array[i].project === dataSetProject && array[i].taskID === submitModalBtn.dataset.taskId) {
                array[i].taskName = taskNameField.value;
                array[i].taskDescription = taskDescField.value;
                array[i].dueDate = taskDueDate.value;
                array[i].priority = taskPriority.value;
                array[i].project = taskProject.value;
                console.log(array[i]);
                generalReset();
            }
        }
    }
}

function generalReset() {
    resetForm();
    hideModal();
    refreshDisplay();
    displayTodo();
    displayProjectButtons();
}

addNewTaskBtn.addEventListener('click', showModal);
closeModalBtn.addEventListener('click', hideModal);
// submitModalBtn.addEventListener('click', pushToDo);
addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (submitModalBtn.textContent === 'Submit New Task') {
        pushToDo();
    } else {
        editToDo();
    }
})

export { showModal, hideModal, pushToDo, editButtonAddListener }

