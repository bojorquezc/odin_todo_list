import { v4 as uuidv4 } from 'uuid';
import { form, taskDialog, showTaskDialog, generalReset } from './todo_form_control';

// Object to hold projects, each project is an array
const todoProjects = {
    no_project: []
};

// Factory function to create todo items
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

// Push to do from the task form into the todoprojects object
function pushToDo() {
    const taskName = form.taskNameField.value;
    const taskDescription = form.taskDescField.value;
    const dueDate = form.taskDueDate.value;
    const priority = form.taskPriority.value.toLowerCase();
    const project = form.taskProject.value.toLowerCase();;
    const taskID = uuidv4();
    const completed = false;

    const newTask = todoItem(taskName, taskDescription, dueDate, priority, project, taskID, completed);
    newTask.createToDo();
    generalReset();
    console.table(todoProjects)
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
                console.table(todoProjects)
            } else if (projectArray === dataSetProject && array[i].taskID === dataSetTaskId && array[i].completed === true) {
                array[i].completed = false;
                this.textContent = 'todo';
                this.classList.add('progress_button');
                this.classList.remove('complete_progress_button');
                console.table(todoProjects)
            }
        }
    }
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
                form.taskProject.value = array[i].project;

                showTaskDialog();
            }
        }
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
                console.table(todoProjects)
            }
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
                console.table(todoProjects)
            }
        }
    }
}


function allTaskButtonAddListener() {
    const allTaskButton = document.querySelector('.all_button');
    allTaskButton.addEventListener('click', generalReset)
}

function progressButtonAddListener() {
    const progressButtons = document.querySelectorAll('.progress_button')
    progressButtons.forEach((button) => {
        button.addEventListener('click', progressToDo);
    });
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


export { todoItem, pushToDo, deleteToDo, allTaskButtonAddListener, progressButtonAddListener, deleteButtonAddListener, editButtonAddListener, editToDo, editFilter, progressToDo, todoProjects };