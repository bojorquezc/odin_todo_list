import { pushToDo, editToDo, addProjectFromDialog, showProjectsInSelect } from "./todo_manager";
import { displayTodo, displayManageProjects, refreshDisplay, displayProjectButtons, displayProgressStatus } from "./todo_display";

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
    title: document.querySelector('.task_dialog_title'),
    addNewTaskBtn: document.querySelector('.add_task_button'),
    closeBtn: document.querySelector('.close_task_dialog'),
    submitBtn: document.querySelector('.submit_btn')
}

function showTaskDialogNewTask() {
    taskDialog.dialog.style.display = 'block';
    showProjectsInSelect();
}

function showTaskDialogEditTask() {
    taskDialog.dialog.style.display = 'block';
}

function hideTaskDialog() {
    taskDialog.dialog.style.display = 'none';
    resetTaskForm();
}

taskDialog.addNewTaskBtn.addEventListener('click', showTaskDialogNewTask);
taskDialog.closeBtn.addEventListener('click', hideTaskDialog);

// Object to control project dialog
const projectDialog = {
    dialog: document.querySelector('.projects_dialog'),
    projectContainer: document.querySelector('.project_list_container'),
    manageProjectsBtn: document.querySelector('.manage_project_button'),
    closeBtn: document.querySelector('.close_project_dialog'),
    projectListContainer: document.querySelector('.project_list_container'),
    projectInput: document.getElementById('new_project_input'),
    projectSubmitBtn: document.querySelector('.new_project_submit')
}

function showProjectDialog() {
    projectDialog.dialog.style.display = 'block';
    displayManageProjects();
}

function hideProjectDialog() {
    projectDialog.dialog.style.display = 'none';
}

projectDialog.manageProjectsBtn.addEventListener('click', showProjectDialog);
projectDialog.closeBtn.addEventListener('click', hideProjectDialog);

// Add a new project from project input, do a general reset
projectDialog.projectSubmitBtn.addEventListener('click', () => {
    const projectInputValue = projectDialog.projectInput.value;
    addProjectFromDialog(projectInputValue.toLowerCase())
    projectDialog.projectInput.value = '';
    generalReset();
    displayManageProjects();
});


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

export { showTaskDialogNewTask, showTaskDialogEditTask, hideTaskDialog, pushToDo, generalReset, form, taskDialog, projectDialog }