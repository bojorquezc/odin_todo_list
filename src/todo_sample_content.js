import { v4 as uuidv4 } from 'uuid';
import { todoItem } from "./todo_manager";

//sample todo tasks
function loadSampleContent() {
    const buyFood = todoItem('Buy Food for Meal Prep', 'Go to the market and buy food, make sure the food is fresh', '2023-08-05T13:15', 'Medium', 'Home', uuidv4(), false);
    buyFood.createToDo()
    
    const doLaundry = todoItem('Do Laundry and Dry Clothes', 'Wash my clothes and set it to dry under the shade', '2023-10-15T12:00', 'Medium', 'Home', uuidv4(), false);
    doLaundry.createToDo();
    
    const studyCode = todoItem('Study Coding This Afternoon', 'Spend 30 minutes learning about JS modules, add notes to black notebook', '2023-11-11T16:30', 'Medium', 'Study', uuidv4(), false);
    studyCode.createToDo();
}

export { loadSampleContent };
