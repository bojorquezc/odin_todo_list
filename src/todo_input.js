import { v4 as uuidv4 } from 'uuid';
import { todoItem, todoProjects } from "./todo_manager";
import { displayTodo, refreshDisplay, displayProjectButtons } from "./todo_display";

const form = {
    addTaskForm: document.querySelector('.add_task_form'),
    taskNameField: document.querySelector('#taskName'),
    taskDescField: document.querySelector('#taskDesc'),
    taskDueDate: document.querySelector('#dueDate'),
    taskPriority: document.querySelector('#priority'),
    taskProject: document.querySelector('#project'),
}

const dialog = {
    taskDialog: document.querySelector('.dialog_container'),
    title: document.querySelector('.dialog_title'),
    addNewTaskBtn: document.querySelector('.add_task_button'),
    closeBtn: document.querySelector('.close_dialog'),
    submitBtn: document.querySelector('.submit_btn')
}

function showDialog() {
    dialog.taskDialog.style.display = 'block';
}

function hideDialog() {
    dialog.taskDialog.style.display = 'none';
    resetForm();
}

function resetForm() {
    form.addTaskForm.reset();
    dialog.title.textContent = 'Add a new task';
    dialog.submitBtn.textContent = 'Submit New Task';

}

function pushToDo() {
    const taskName = form.taskNameField.value;
    const taskDescription = form.taskDescField.value;
    const dueDate = form.taskDueDate.value;
    const priority = form.taskPriority.value;
    const project = form.taskProject.value;
    const taskID = uuidv4();
    const completed = false;

    const newTask = todoItem(taskName, taskDescription, dueDate, priority, project, taskID, completed);
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

                dialog.title.textContent = 'Edit Task';
                dialog.submitBtn.textContent = 'Edit Task';
                dialog.submitBtn.dataset.project = dataSetProject;
                dialog.submitBtn.dataset.taskId = dataSetTaskId;

                form.taskNameField.value = array[i].taskName;
                form.taskDescField.value = array[i].taskDescription;
                form.taskDueDate.value = array[i].dueDate;
                form.taskPriority.value = array[i].priority;
                form.taskProject.value = array[i].project;

                showDialog();
            }
        }
    }
}

function editToDo() {
    const dataSetProject = dialog.submitBtn.dataset.project;
    const dataSetTaskId = dialog.submitBtn.dataset.taskId;
    for (const projectArray in todoProjects) {
        const array = todoProjects[projectArray];

        for (let i = 0; i < array.length; i++) {
            if (array[i].project === dataSetProject && array[i].taskID === dataSetTaskId) {
                array[i].taskName = form.taskNameField.value;
                array[i].taskDescription = form.taskDescField.value;
                array[i].dueDate = form.taskDueDate.value;
                array[i].priority = form.taskPriority.value;
                array[i].project = form.taskProject.value;
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

dialog.addNewTaskBtn.addEventListener('click', showDialog);
dialog.closeBtn.addEventListener('click', hideDialog);
// dialog.submitBtn.addEventListener('click', pushToDo);
form.addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (dialog.submitBtn.textContent === 'Submit New Task') {
        pushToDo();
    } else {
        editToDo();
    }
})

export { showDialog, hideDialog, pushToDo, editButtonAddListener }

