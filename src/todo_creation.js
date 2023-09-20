const todoProjects = {
};

const todoItem = (taskName, taskDescription, dueDate, priority, project) => {
    const projectExists = project in todoProjects;

    function pushToDo() {
        if (projectExists === true) {
            todoProjects[`${project}`].push(this);
        } else {
            todoProjects[`${project}`] = [];
            todoProjects[`${project}`].push(this);
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

    return { taskName, taskDescription, dueDate, priority, project, pushToDo, deleteToDo }
}


const buyFood = todoItem('Buy Food', 'Go to the market and buy food', 'August 25 2023', 'medium', 'home');
buyFood.pushToDo()

const doLaundry = todoItem('Do Laundry', 'Wash my clothes', 'August 27 2023', 'medium', 'gym');
// pushToDo(doLaundry);
doLaundry.pushToDo();

const cookFood = todoItem('Cook Food', 'Cook tasty food', 'August 29 2023', 'medium', 'home');
// pushToDo(cookFood);
cookFood.pushToDo();