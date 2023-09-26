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

                const todoTitle = document.createElement('p');
                todoTitle.textContent = `Title: ${array[i].taskName}`;
                todoContainer.appendChild(todoTitle);

                const todoDescription = document.createElement('p');
                todoDescription.textContent = `Description: ${array[i].taskDescription}`;
                todoContainer.appendChild(todoDescription);

                const todoDueDate = document.createElement('INPUT');
                todoDueDate.setAttribute('type', 'datetime-local');
                todoContainer.appendChild(todoDueDate);

                const priority = document.createElement('p');
                priority.textContent = `Priority: ${array[i].priority}`;
                todoContainer.appendChild(priority);

                const project = document.createElement('p');
                project.textContent = `Project: ${array[i].project}`;
                todoContainer.appendChild(project);

            }
        }
    }
}

export { displayTodo };