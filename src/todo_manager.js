import { v4 as uuidv4 } from 'uuid';

//todo_manager.js takes care of the basic CRUD operations of the todo list project
const todoProjects = {
    Default: []
};



const todoItem = (taskName, taskDescription, dueDate, priority, project, taskID) => {
    
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

    function updateToDo(updatedContent, property) {
        const projectExists = project in todoProjects;
        if (projectExists === true) {
            console.log('Project exists');
            for (let index = 0; index < todoProjects[`${project}`].length; index+=1) {
                if (todoProjects[`${project}`][index].taskName === taskName) {
                    console.log(`Task match found: ${taskName}`);
                    todoProjects[`${project}`][index][`${property}`] = updatedContent;
                    console.log('Task updated');
                }
            }
        } else {
            console.log(`Project does not exist in todoProjects Object.\n'this' Object project: ${this.project}\n`);
        }
    }

    function deleteToDo() {
        const projectExists = project in todoProjects;
        if (projectExists === true) {
            for (let index = 0; index < todoProjects[`${project}`].length; index+=1) {
                if (todoProjects[`${project}`][index].taskName === taskName) {
                    todoProjects[`${project}`].splice(index, 1);
                }
            }
        }
    }

    return { taskName, taskDescription, dueDate, priority, project, taskID, createToDo, updateToDo, deleteToDo }
}

//sample todo tasks
const buyFood = todoItem('Buy Food for Meal Prep', 'Go to the market and buy food, make sure the food is fresh', '2023-08-05T13:15', 'Medium', 'Home', uuidv4());
buyFood.createToDo()

const doLaundry = todoItem('Do Laundry and Dry Clothes', 'Wash my clothes and set it to dry under the shade', '2023-10-15T12:00', 'Medium', 'Home', uuidv4());
doLaundry.createToDo();

const studyCode = todoItem('Study Coding This Afternoon', 'Spend 30 minutes learning about JS modules, add notes to black notebook', '2023-11-11T16:30', 'Medium', 'Study', uuidv4());
studyCode.createToDo();

export { todoItem, todoProjects };