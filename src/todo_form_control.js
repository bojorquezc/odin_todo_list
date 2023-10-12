import { pushToDo, editToDo } from "./todo_manager";
import { displayTodo, refreshDisplay, displayProjectButtons, displayProgressStatus } from "./todo_display";

// Object to control task form
const form = {
    addTaskForm: document.querySelector('.add_task_form'),
    taskNameField: document.querySelector('#taskName'),
    taskDescField: document.querySelector('#taskDesc'),
    taskDueDate: document.querySelector('#dueDate'),
    taskPriority: document.querySelector('#priority'),
    taskProject: document.querySelector('#project'),
}

form.addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (taskDialog.submitBtn.textContent === 'Submit New Task') {
        pushToDo();
    } else {
        editToDo();
    }
})

// Object to control task dialog
const taskDialog = {
    dialog: document.querySelector('.tasks_dialog'),
    title: document.querySelector('.dialog_title'),
    addNewTaskBtn: document.querySelector('.add_task_button'),
    closeBtn: document.querySelector('.close_dialog'),
    submitBtn: document.querySelector('.submit_btn')
}

function showTaskDialog() {
    taskDialog.dialog.style.display = 'block';
}

function hideTaskDialog() {
    taskDialog.dialog.style.display = 'none';
    resetTaskForm();
}

taskDialog.addNewTaskBtn.addEventListener('click', showTaskDialog);
taskDialog.closeBtn.addEventListener('click', hideTaskDialog);

// Object to control project dialog
const projectDialog = {
    dialog: document.querySelector('.projects_dialog'),
    manageProjectsBtn: document.querySelector('.manage_project_button')
}

function showProjectDialog() {
    projectDialog.dialog.style.display = 'block';
}

function hideProjectDialog() {
    projectDialog.dialog.style.display = 'none';
}

projectDialog.manageProjectsBtn.addEventListener('click', showProjectDialog);


function resetTaskForm() {
    form.addTaskForm.reset();
    taskDialog.title.textContent = 'Add a new task';
    taskDialog.submitBtn.textContent = 'Submit New Task';

}

function generalReset() {
    resetTaskForm();
    hideTaskDialog();
    refreshDisplay();
    displayTodo();
    displayProjectButtons();
    displayProgressStatus();
}

export { showTaskDialog, hideTaskDialog, pushToDo, generalReset, form, taskDialog, projectDialog }