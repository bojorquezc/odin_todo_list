import { todoProjects, progressButtonAddListener, editButtonAddListener, deleteButtonAddListener } from "./todo_manager";

// Create a todo card per todo in the todoProjects object's arrays
function displayTodo() {
    for (const projectArray in todoProjects) {
        const array = todoProjects[projectArray];
        for (let i = 0; i < array.length; i++) {
            createTaskCardElements(projectArray, array, i);
        }
    }
}

// Create a todo card per todo by filtering per project
function projectFilter() {
    refreshDisplay();
    displayProjectButtons();
    for (const projectArray in todoProjects) {
        const array = todoProjects[projectArray];
        for (let i = 0; i < array.length; i++) {
            if (projectArray === this.id) {
                createTaskCardElements(projectArray, array, i);
            }
        }
    }
    displayProgressStatus();
}

function displayProgressStatus() {
    for (const projectArray in todoProjects) {
        const array = todoProjects[projectArray];
        for (let i = 0; i < array.length; i++) {
            if (array[i].completed === true) {
                const progressButtons = document.querySelectorAll('.progress_button')
                progressButtons.forEach((button) => {
                    if (button.dataset.taskId === array[i].taskID) {
                        button.textContent = 'Complete';
                        button.classList.remove('progress_button');
                        button.classList.add('complete_progress_button');
                    }
                });
            }
        }
    }
}

// Display the buttons for navigation between projects
function displayProjectButtons() {
    const projectButtonsSection = document.querySelector('.project_buttons');

    for (const projectArray in todoProjects) {
        const array = todoProjects[projectArray];
        if (array.length > 0) {
            const projectButton = document.createElement('button');
            projectButton.classList.add('project_button');
            projectButton.setAttribute('id', projectArray);
            projectButton.textContent = projectArray;
            projectButtonsSection.appendChild(projectButton);
        }
    }
    projectButtonAddListener();
}

function projectButtonAddListener() {
    const projectButtons = document.querySelectorAll('.project_button')
    projectButtons.forEach((button) => {
        button.addEventListener('click', projectFilter)
    });
}

// Refresh the project tasks
function refreshDisplay() {
    const projectButtonsSection = document.querySelector('.project_buttons');
    const mainContent = document.querySelector('.content');

    projectButtonsSection.replaceChildren();
    mainContent.replaceChildren();
}

function createTaskCardElements(projectArray, array, i) {
    const mainContent = document.querySelector('.content');
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo_container')
    mainContent.appendChild(todoContainer);

    const taskButtonDiv = document.createElement('div');
    taskButtonDiv.classList.add('task_buttons');
    todoContainer.appendChild(taskButtonDiv);

    const progressButton = document.createElement('button');
    progressButton.textContent = 'todo';
    progressButton.classList.add('progress_button');
    progressButton.dataset.project = projectArray;
    progressButton.dataset.taskId = array[i].taskID;
    taskButtonDiv.appendChild(progressButton);
    progressButtonAddListener();

    const editButton = document.createElement('button');
    editButton.textContent = 'edit';
    editButton.classList.add('edit_button');
    editButton.dataset.project = projectArray;
    editButton.dataset.taskId = array[i].taskID;
    taskButtonDiv.appendChild(editButton);
    editButtonAddListener();

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    deleteButton.classList.add('delete_button');
    deleteButton.dataset.project = projectArray;
    deleteButton.dataset.taskId = array[i].taskID;
    taskButtonDiv.appendChild(deleteButton);
    deleteButtonAddListener();

    const todoTaskNameTitle = document.createElement('p');
    todoTaskNameTitle.classList.add('card-title');
    todoTaskNameTitle.textContent = 'Title:';
    todoContainer.appendChild(todoTaskNameTitle);
    const todoTaskName = document.createElement('p');
    todoTaskName.textContent = array[i].taskName;
    todoContainer.appendChild(todoTaskName);

    const todoDescriptionTitle = document.createElement('p');
    todoDescriptionTitle.classList.add('card-title');
    todoDescriptionTitle.textContent = 'Description:';
    todoContainer.appendChild(todoDescriptionTitle);
    const todoDescription = document.createElement('p');
    todoDescription.textContent = array[i].taskDescription;
    todoContainer.appendChild(todoDescription);

    const todoDueDateTitle = document.createElement('p');
    todoDueDateTitle.classList.add('card-title');
    todoDueDateTitle.textContent = 'Due Date:';
    todoContainer.appendChild(todoDueDateTitle);
    const todoDueDate = document.createElement('p');
    todoDueDate.textContent = array[i].dueDate;
    todoContainer.appendChild(todoDueDate);

    const priorityTitle = document.createElement('p');
    priorityTitle.classList.add('card-title');
    priorityTitle.textContent = 'Priority:';
    todoContainer.appendChild(priorityTitle);
    const priority = document.createElement('p');
    priority.textContent = array[i].priority;
    todoContainer.appendChild(priority);

    const projectTitle = document.createElement('p');
    projectTitle.classList.add('card-title');
    projectTitle.textContent = 'Project:'
    todoContainer.appendChild(projectTitle);
    const project = document.createElement('p');
    project.textContent = array[i].project;
    todoContainer.appendChild(project);
}

export { displayTodo, refreshDisplay, displayProjectButtons, displayProgressStatus };