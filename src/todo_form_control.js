import { pushToDo, editToDo } from "./todo_manager";
import { displayTodo, refreshDisplay, displayProjectButtons, displayProgressStatus } from "./todo_display";

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

function generalReset() {
    resetForm();
    hideDialog();
    refreshDisplay();
    displayTodo();
    displayProjectButtons();
    displayProgressStatus();
}

dialog.addNewTaskBtn.addEventListener('click', showDialog);
dialog.closeBtn.addEventListener('click', hideDialog);
form.addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (dialog.submitBtn.textContent === 'Submit New Task') {
        pushToDo();
    } else {
        editToDo();
    }
})

export { showDialog, hideDialog, pushToDo, generalReset, form, dialog }