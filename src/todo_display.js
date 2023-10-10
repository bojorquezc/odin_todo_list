// import { todoItem } from './todo_manager.js';
import { v4 as uuidv4 } from 'uuid';
import { todoProjects } from "./todo_manager";
import { editButtonAddListener } from "./todo_modal";

// Create a todo card per todo in the todoProjects object's arrays
function displayTodo() {
    for (const projectArray in todoProjects) {
        const array = todoProjects[projectArray];
        for (let i = 0; i < array.length; i++) {

            const mainContent = document.querySelector('.content');
            const todoContainer = document.createElement('div');
            todoContainer.classList.add('todo_container')
            mainContent.appendChild(todoContainer);

            const taskButtonDiv =  document.createElement('div');
            taskButtonDiv.classList.add('task_buttons');
            todoContainer.appendChild(taskButtonDiv);

            const editButton = document.createElement('button');
            editButton.textContent = 'edit';
            editButton.classList.add('edit_button');
            editButton.dataset.project = projectArray;
            editButton.dataset.taskId = array[i].taskID;
            taskButtonDiv.appendChild(editButton);
            editButtonAddListener();

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
    }
}

// Display the buttons for navigation between projects

function displayProjectButtons() {
    const projectButtonsSection = document.querySelector('.project_buttons_section');

    for (const projectArray in todoProjects) {
        const projectButton = document.createElement('button');
        projectButton.classList.add('project_button');
        projectButton.setAttribute('id', projectArray);
        projectButton.textContent = projectArray;
        projectButtonsSection.appendChild(projectButton);
    }
    projectButtonAddListener();
}

function projectButtonAddListener() {
    const projectButtons = document.querySelectorAll('.project_button')
    projectButtons.forEach((button) => {
        button.addEventListener('click', projectFilter)
    });
}

function projectFilter() {
    refreshDisplay();
    displayProjectButtons();
    for (const projectArray in todoProjects) {
        const array = todoProjects[projectArray];
        for (let i = 0; i < array.length; i++) {
            if (projectArray === this.id) {

                const mainContent = document.querySelector('.content');
                const todoContainer = document.createElement('div');
                todoContainer.classList.add('todo_container')
                mainContent.appendChild(todoContainer);

                const todoTaskNameTitle = document.createElement('p');
                todoTaskNameTitle.classList.add('card-title');
                todoTaskNameTitle.textContent = 'Title:';
                todoContainer.appendChild(todoTaskNameTitle);
                const todoTaskName = document.createElement('p');
                todoTaskName.textContent = array[i].taskName;
                todoContainer.appendChild(todoTaskName);
            }
        }
    }
}

// Refresh the project tasks
function refreshDisplay() {
    const projectButtonsSection = document.querySelector('.project_buttons_section');
    const mainContent = document.querySelector('.content');
    
    projectButtonsSection.replaceChildren();
    mainContent.replaceChildren();
}

export { displayTodo, refreshDisplay, displayProjectButtons };