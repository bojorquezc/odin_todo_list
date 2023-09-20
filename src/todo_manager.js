//todo_manager.js takes care of the basic CRUD operations of the todo list project

const todoProjects = {};

const todoItem = (taskName, taskDescription, dueDate, priority, project) => {
    const projectExists = project in todoProjects;

    function createToDo() {
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

    function updateToDo() {
    // function updateToDo(updatedContent, property) {
        if (projectExists === true) {
            console.log('Project exists')
            // for (let index = 0; index < todoProjects[`${project}`].length; index+=1) {
            //     if (todoProjects[`${project}`][index].taskName === taskName) {
            //         console.log(`TEST!`)
            //         // todoProjects[`${project}`][index].property = updatedContent;
            //     }
            // }
        }
    }

    function deleteToDo() {
        if (projectExists === true) {
            for (let index = 0; index < todoProjects[`${project}`].length; index+=1) {
                if (todoProjects[`${project}`][index].taskName === taskName) {
                    todoProjects[`${project}`].splice(index, 1);
                }
            }
        }
    }

    return { taskName, taskDescription, dueDate, priority, project, createToDo, updateToDo, deleteToDo }
}


const buyFood = todoItem('Buy Food', 'Go to the market and buy food', 'August 25 2023', 'medium', 'home');
buyFood.createToDo()

const doLaundry = todoItem('Do Laundry', 'Wash my clothes', 'August 27 2023', 'medium', 'gym');
// createToDo(doLaundry);
doLaundry.createToDo();

const cookFood = todoItem('Cook Food', 'Cook tasty food', 'August 29 2023', 'medium', 'home');
// createToDo(cookFood);
cookFood.createToDo();