import { v4 as uuidv4 } from 'uuid';
import {
    form,
    generalReset,
    showTaskDialogEditTask,
    taskDialog
} from './todo_form_control';
import {
    projectDialog
} from './todo_form_control';
import {
    displayManageProjects
} from './todo_display';

// Object to hold projects, each project is an array
let todoProjects = {
    no_project: []
};

// Manage local storage by interacting with main todoProjects object
function saveLocalStorage() {
    const todoProjectsSerialized = JSON.stringify(todoProjects);
    localStorage.setItem('todoProjectsSerialized', todoProjectsSerialized);
}

function fetchLocalStorage() {
    if (localStorage.length >= 1) {
        const todoProjectsDeserialized = JSON.parse(localStorage.getItem('todoProjectsSerialized'));
        todoProjects = todoProjectsDeserialized;
        generalReset();
    }
}

// Factory function to create todo items
const todoItem = (taskName, taskDescription, dueDate, priority, project, taskID, completed) => {
    
    function createToDo() {
        const projectExists = project in todoProjects;
        if (projectExists === true) {
            todoProjects[`${project}`].push(this);
        } else {
            todoProjects[`${project}`] = [];
            todoProjects[`${project}`].push(this);
        }
    }

    return { taskName, taskDescription, dueDate, priority, project, taskID, completed, createToDo }
}

// Push to do from the task form into the todoProjects object
function pushToDo() {
    const completed = false;
    const dueDate = form.taskDueDate.value;
    const priority = form.taskPriority.value.toLowerCase();
    const project = form.taskProject.value.toLowerCase();
    const taskDescription = form.taskDescField.value;
    const taskID = uuidv4();
    const taskName = form.taskNameField.value;

    const newTask = todoItem(taskName, taskDescription, dueDate, priority, project, taskID, completed);
    newTask.createToDo();
    generalReset();
    saveLocalStorage();
}

// Read the completed status and either mark the task as "complete" or "todo"
function progressToDo() {
    for (const projectArray in todoProjects) {
        const dataSetProject = this.dataset.project;
        const dataSetTaskId = this.dataset.taskId;
        const array = todoProjects[projectArray];

        for (let i = 0; i < array.length; i++) {
            if (projectArray === dataSetProject && array[i].taskID === dataSetTaskId && array[i].completed === false) {
                array[i].completed = true;
                this.textContent = 'complete';
                this.classList.remove('progress_button');
                this.classList.add('complete_progress_button');
            } else if (projectArray === dataSetProject && array[i].taskID === dataSetTaskId && array[i].completed === true) {
                array[i].completed = false;
                this.textContent = 'todo';
                this.classList.add('progress_button');
                this.classList.remove('complete_progress_button');
            }
            saveLocalStorage();
        }
    }
}

// Show the available projects in the select dropdown for the task form dialog
function showProjectsInSelect() {
    const projectSelectField = document.getElementById('project');
    projectSelectField.replaceChildren();
    for (const projectArray in todoProjects) {
        const optionProject = document.createElement('option');
        optionProject.value = projectArray;
        optionProject.textContent = projectArray;
        projectSelectField.appendChild(optionProject);
    }
}

// Add a project to the todoProjects object
function addProjectFromDialog(project) {
    const projectExists = project in todoProjects;
        if (projectExists === true) {
            alert('Project exists, please add a different name to the project');
        } else if (projectDialog.projectInput.value === '') {
            alert('Enter a project name, project name can\'t be empty');
        } else {
            todoProjects[`${project}`] = [];
        }
        saveLocalStorage();
}

// Delete a project from the todoProjects object
function deleteProjectFromDialog() {
    for (const projectArray in todoProjects) {
        if (this.dataset.project === projectArray) {
            const array = todoProjects[projectArray];
            for (let i = 0; i < array.length; i++) {
                array[i].project = 'no_project';
                todoProjects['no_project'].push(array[i]);
            }
            delete todoProjects[projectArray];
        }
    }
    generalReset();
    displayManageProjects();
    saveLocalStorage();
}

// Show task information when edit button is clicked in the todo task card
function editFilter() {
    for (const projectArray in todoProjects) {
        const dataSetProject = this.dataset.project;
        const dataSetTaskId = this.dataset.taskId;
        const array = todoProjects[projectArray];

        for (let i = 0; i < array.length; i++) {
            if (projectArray === dataSetProject && array[i].taskID === dataSetTaskId) {

                taskDialog.title.textContent = 'Edit Task';
                taskDialog.submitBtn.textContent = 'Edit Task';
                taskDialog.submitBtn.dataset.project = dataSetProject;
                taskDialog.submitBtn.dataset.taskId = dataSetTaskId;

                form.taskNameField.value = array[i].taskName;
                form.taskDescField.value = array[i].taskDescription;
                form.taskDueDate.value = array[i].dueDate;
                form.taskPriority.value = array[i].priority.toLowerCase();
                showProjectsInSelect();
                form.taskProject.value = array[i].project;

                console.log(todoProjects);
                console.log(`This is the array project ${array[i].project}`)
                console.log(`This is the taskProject Value ${form.taskProject.value}`)
                console.log(`This is the dataSetProject ${dataSetProject}`)
            }
        }
        showTaskDialogEditTask();
    }
}

// Update the todo after the task form information has been edited
function editToDo() {
    const dataSetProject = taskDialog.submitBtn.dataset.project;
    const dataSetTaskId = taskDialog.submitBtn.dataset.taskId;
    for (const projectArray in todoProjects) {
        const array = todoProjects[projectArray];

        for (let i = 0; i < array.length; i++) {
            if (array[i].project === dataSetProject && array[i].taskID === dataSetTaskId) {
                array[i].taskName = form.taskNameField.value;
                array[i].taskDescription = form.taskDescField.value;
                array[i].dueDate = form.taskDueDate.value;
                array[i].priority = form.taskPriority.value;
                if (form.taskProject.value === dataSetProject) {
                    array[i].project = form.taskProject.value.toLowerCase();
                } else {
                    array.splice(i, 1);
                    pushToDo();
                }
                generalReset();
            }
            saveLocalStorage();
        }
    }
}

// Delete a todo, it removes it from the project array
function deleteToDo() {
    for (const projectArray in todoProjects) {
        const dataSetProject = this.dataset.project;
        const dataSetTaskId = this.dataset.taskId;
        const array = todoProjects[projectArray];

        for (let i = 0; i < array.length; i++) {
            if (projectArray === dataSetProject && array[i].taskID === dataSetTaskId) {
                array.splice(i, 1);
                generalReset();
            }
        }
        saveLocalStorage();
    }
}


export {
    addProjectFromDialog,
    deleteProjectFromDialog,
    deleteToDo,
    editFilter,
    editToDo,
    fetchLocalStorage,
    progressToDo,
    pushToDo,
    saveLocalStorage,
    showProjectsInSelect,
    todoItem,
    todoProjects
};