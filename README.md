# The Odin Project - Todo List

## Project Description
Todo app with the following requirements:

1. 'todos' should be objects dynamically created, through the use of factories, constructors or classes. For this project I will be choosing factory functions.
2. 'todos' should be stored in an array and the array needs to be iterated over to display in the webpage dynamically.
3. Each todo item will have the following details:
	1. taskName
	2. taskDescription
	3. dueDate
	4. priority
		1. priorityLow
		2. priorityMedium
		3. priorityHigh
4. There should be containers that act as folders for the 'todos', these will be called 'Projects'. Upon first load, the 'todos' should show in a 'Default' project. When the user creates a new 'todo' they should be able to select the project in which they would like to add the to do.
5. The application logic will be separated from the DOM-related code, there needs to be a separation of the code through the use of modules.
6. Web Storage API localStorage will be used for storing data for now

## Tech
The following tech should be used in this project:

1. [Webpack](https://webpack.js.org/)
2. [date-fns library](https://github.com/date-fns/date-fns)
3. [Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
4. [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)

## SOLID
This project should try to apply the **Single Responsibility Principle**
>A class should have one and only one reason to change, meaning that a class should have only one job.

## App UI/UX
1. User should be able to see and select all projects, either in a list, dropdown
2. User should be able to view each 'todo' in a project when clicking a project, the projects should show in a list view
3. User should be able to view 'taskName', 'dueDate', 'priority' in the 'todo' list view when they click on a project
4. User should be able to see/edit a 'todo' when they click on it to expand it
5. User should be able to delete 'todo' items

Full project description [TOP - Todo List](https://www.theodinproject.com/lessons/node-path-javascript-todo-list)