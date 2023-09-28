// import { todoItem } from './todo_manager.js';
import { todoProjects } from "./todo_manager";

function displayTodo() {
    for (const project in todoProjects) {
        if (Array.isArray(todoProjects[project])) {
            const array = todoProjects[project];
            for (let i = 0; i < array.length; i++) {

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
}

function refreshDisplay() {
    const mainContent = document.querySelector('.content');
    mainContent.replaceChildren();

}

export { displayTodo, refreshDisplay };