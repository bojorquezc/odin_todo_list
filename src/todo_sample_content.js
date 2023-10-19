import { v4 as uuidv4 } from 'uuid';
import {
    todoItem,
    todoProjects
} from "./todo_manager";

function loadSampleButton() {
    const loadSampleBtn = document.querySelector('load_sample_data_button')
    loadSampleBtn.addEventListener('click', loadSampleContent);
}


//sample todo tasks
function loadSampleContent() {
    const buyFood = todoItem('Buy Food for Meal Prep', 'Go to the market and buy food, make sure the food is fresh', '2023-08-05T13:15', 'medium', 'home', uuidv4(), false);
    buyFood.createToDo()
    
    const doLaundry = todoItem('Do Laundry and Dry Clothes', 'Wash my clothes and set it to dry under the shade', '2023-10-15T12:00', 'medium', 'home', uuidv4(), false);
    doLaundry.createToDo();
    
    const studyCode = todoItem('Study Coding This Afternoon', 'Spend 30 minutes learning about JS modules, add notes to black notebook', '2023-11-11T16:30', 'medium', 'study', uuidv4(), false);
    studyCode.createToDo();

    const jog = todoItem('Jog In The Park', 'Jog for 30 minutes in the park near the office', '2023-12-11T16:30', 'low', 'exercise', uuidv4(), false);
    jog.createToDo();

    console.table(todoProjects)
}

export { 
    loadSampleButton,
    loadSampleContent
};
