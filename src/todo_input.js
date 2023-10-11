import { v4 as uuidv4 } from 'uuid';
import { todoItem, todoProjects} from "./todo_manager";
import { displayTodo, refreshDisplay, displayProjectButtons } from "./todo_display";



const formTitle = document.querySelector('.form-title');
const addNewTaskBtn = document.querySelector('.add_task_button');
const closeDialogBtn = document.querySelector('.close_dialog')
const submitDialogBtn = document.querySelector('.submit_btn');
const editDialogBtn = document.querySelector('.edit_btn');
const taskDialog = document.querySelector('.dialog_form');

const taskNameField = document.querySelector('#taskName');
const taskDescField = document.querySelector('#taskDesc');
const taskDueDate = document.querySelector('#dueDate');
const taskPriority = document.querySelector('#priority');
const taskProject = document.querySelector('#project');
const addTaskForm = document.querySelector('.add_task_form');



function showDialog() {
    taskDialog.style.display = 'block';
}

function hideDialog() {
    taskDialog.style.display = 'none';
    resetForm();
}

function resetForm() {
    addTaskForm.reset();
    formTitle.textContent = 'Add a new task';
    submitDialogBtn.textContent = 'Submit New Task';

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
                submitDialogBtn.textContent = 'Edit Task';
                submitDialogBtn.dataset.project = dataSetProject;
                submitDialogBtn.dataset.taskId = dataSetTaskId;

                taskNameField.value = array[i].taskName;
                taskDescField.value = array[i].taskDescription;
                taskDueDate.value = array[i].dueDate;
                taskPriority.value = array[i].priority;
                taskProject.value = array[i].project;
                
                showDialog();
            }
        }
    }
}

function editToDo() {
    const dataSetProject = submitDialogBtn.dataset.project;
    const dataSetTaskId = submitDialogBtn.dataset.taskId;
    for (const projectArray in todoProjects) {
        const array = todoProjects[projectArray];

        for (let i = 0; i < array.length; i++) {
            if (array[i].project === dataSetProject && array[i].taskID === dataSetTaskId) {
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
    hideDialog();
    refreshDisplay();
    displayTodo();
    displayProjectButtons();
}

addNewTaskBtn.addEventListener('click', showDialog);
closeDialogBtn.addEventListener('click', hideDialog);
// submitDialogBtn.addEventListener('click', pushToDo);
addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (submitDialogBtn.textContent === 'Submit New Task') {
        pushToDo();
    } else {
        editToDo();
    }
})

export { showDialog, hideDialog, pushToDo, editButtonAddListener }

