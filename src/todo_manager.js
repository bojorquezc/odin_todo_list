import { v4 as uuidv4 } from 'uuid';
import { form, dialog, showDialog, generalReset } from './todo_form_control';

//todo_manager.js takes care of the basic CRUD operations of the todo list project
const todoProjects = {
    Default: []
};

const todoItem = (taskName, taskDescription, dueDate, priority, project, taskID, completed) => {
    
    function createToDo() {
        const projectExists = project in todoProjects;
        if (projectExists === true) {
            console.log(`Push to existing project: ${project}`)
            todoProjects[`${project}`].push(this);
        } else {
            todoProjects[`${project}`] = [];
            console.log(`Create project array: ${project}`)
            todoProjects[`${project}`].push(this);
            console.log(`Push to project: ${project}`)
        }
    }

    return { taskName, taskDescription, dueDate, priority, project, taskID, completed, createToDo }
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

function deleteToDo() {
    for (const projectArray in todoProjects) {
        const dataSetProject = this.dataset.project;
        const dataSetTaskId = this.dataset.taskId;
        const array = todoProjects[projectArray];

        for (let i = 0; i < array.length; i++) {
            if (projectArray === dataSetProject && array[i].taskID === dataSetTaskId) {
                array.splice(i, 1);
                generalReset();
                console.table(todoProjects)
            }
        }
    }
}

function editButtonAddListener() {
    const editButtons = document.querySelectorAll('.edit_button')
    editButtons.forEach((button) => {
        button.addEventListener('click', editFilter)
    });
}

function deleteButtonAddListener() {
    const deleteButtons = document.querySelectorAll('.delete_button')
    deleteButtons.forEach((button) => {
        button.addEventListener('click', deleteToDo)
    });
}

export { todoItem, pushToDo, deleteToDo, editButtonAddListener, editToDo, editFilter, deleteButtonAddListener, todoProjects };