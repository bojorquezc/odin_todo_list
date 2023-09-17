const todoProjects = {
};

const todoItem = (taskName, taskDescription, dueDate, priority, project) => {
    return { taskName, taskDescription, dueDate, priority, project }
}

function pushToArray(todoItem) {
    const arrayName = todoItem.project;
    const projectExists = arrayName in todoProjects;
    if (projectExists === true) {
        todoProjects[`${arrayName}`].push(todoItem);
    } else {
        todoProjects[`${arrayName}`] = [];
        todoProjects[`${arrayName}`].push(todoItem);
    }
}


const buyFood = todoItem('Buy Food', 'Go to the market and buy food', 'August 25 2023', 'medium', 'home');
pushToArray(buyFood);

const doLaundry = todoItem('Do Laundry', 'Wash my clothes', 'August 27 2023', 'medium', 'gym');
pushToArray(doLaundry);

const cookFood = todoItem('Cook Food', 'Cook tasty food', 'August 29 2023', 'medium', 'home');
pushToArray(cookFood);