/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-cycle */
/* eslint-disable no-use-before-define */
import {
  deleteProjectFromDialog,
  deleteToDo,
  editFilter,
  progressToDo,
  todoProjects,
} from './todo_manager';
import {
  generalReset,
  projectDialog,
} from './todo_form_control';

// Create a todo card per todo in the todoProjects object's arrays
function displayTodo() {
  for (const projectArray in todoProjects) {
    const array = todoProjects[projectArray];
    for (let i = 0; i < array.length; i += 1) {
      createTaskCardElements(projectArray, array, i);
    }
  }
}

// Display projects in "Manage Projects" dialog. Ignore 'no_project' that is the default project
function displayManageProjects() {
  projectDialog.projectListContainer.replaceChildren();
  for (const projectArray in todoProjects) {
    if (projectArray !== 'no_project') {
      createManageProjectsList(projectArray);
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

// Add project filtering options, showing only todo card for filtered items
function projectButtonFilter() {
  refreshDisplay();
  displayProjectButtons();
  for (const projectArray in todoProjects) {
    const array = todoProjects[projectArray];
    for (let i = 0; i < array.length; i += 1) {
      if (projectArray === this.id) {
        createTaskCardElements(projectArray, array, i);
      }
    }
  }
  displayProgressStatus();
}

// Allow the option to set a task to 'complete' or vice versa in the todo card
function displayProgressStatus() {
  for (const projectArray in todoProjects) {
    const array = todoProjects[projectArray];
    for (let i = 0; i < array.length; i += 1) {
      if (array[i].completed === true) {
        const progressButtons = document.querySelectorAll('.progress_button');
        progressButtons.forEach((button) => {
          if (button.dataset.taskId === array[i].taskID) {
            button.textContent = 'complete';
            button.classList.remove('progress_button');
            button.classList.add('complete_progress_button');
          }
        });
      }
    }
  }
}

// Refresh dynamically created elements
function refreshDisplay() {
  const projectButtonsSection = document.querySelector('.project_buttons');
  const mainContent = document.querySelector('.content');

  projectButtonsSection.replaceChildren();
  mainContent.replaceChildren();
}

// Create rows for each project
function createManageProjectsList(project) {
  const projectRow = document.createElement('div');
  projectRow.classList.add('project_row');
  projectRow.textContent = project;
  projectDialog.projectListContainer.appendChild(projectRow);

  const deleteProjectButton = document.createElement('button');
  deleteProjectButton.classList.add('project_delete_button');
  deleteProjectButton.textContent = 'x';
  deleteProjectButton.dataset.project = project;
  projectRow.appendChild(deleteProjectButton);
  deleteProjectButtonDialogAddListener();
}

// Create todo cards for each task
function createTaskCardElements(projectArray, array, i) {
  const mainContent = document.querySelector('.content');
  const todoContainer = document.createElement('div');
  todoContainer.classList.add('todo_container');
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
  projectTitle.textContent = 'Project:';
  todoContainer.appendChild(projectTitle);
  const project = document.createElement('p');
  project.textContent = array[i].project;
  todoContainer.appendChild(project);
}

// Add listeners section

function deleteProjectButtonDialogAddListener() {
  const deleteProjectButtons = document.querySelectorAll('.project_delete_button');
  deleteProjectButtons.forEach((button) => {
    button.addEventListener('click', deleteProjectFromDialog);
  });
}

function projectButtonAddListener() {
  const projectButtons = document.querySelectorAll('.project_button');
  projectButtons.forEach((button) => {
    button.addEventListener('click', projectButtonFilter);
  });
}

function allTaskButtonAddListener() {
  const allTaskButton = document.querySelector('.all_button');
  allTaskButton.addEventListener('click', generalReset);
}

function progressButtonAddListener() {
  const progressButtons = document.querySelectorAll('.progress_button');
  progressButtons.forEach((button) => {
    button.addEventListener('click', progressToDo);
  });
}

function editButtonAddListener() {
  const editButtons = document.querySelectorAll('.edit_button');
  editButtons.forEach((button) => {
    button.addEventListener('click', editFilter);
  });
}

function deleteButtonAddListener() {
  const deleteButtons = document.querySelectorAll('.delete_button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', deleteToDo);
  });
}

export {
  allTaskButtonAddListener,
  displayManageProjects,
  displayProgressStatus,
  displayProjectButtons,
  displayTodo,
  refreshDisplay,
};
