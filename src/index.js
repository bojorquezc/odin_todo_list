import './style.css';
import { displayTodo, displayProjectButtons, allTaskButtonAddListener } from './todo_display';
import { saveLocalStorage, fetchLocalStorage } from './todo_manager';
import { loadSampleContent } from './todo_sample_content';

// fetchLocalStorage();
loadSampleContent()
displayTodo()
allTaskButtonAddListener();

// function startProject() {
//     if (localStorage.length === 0) {
//         loadSampleContent();
//         displayTodo();
//         allTaskButtonAddListener();
//     } else {
//         fetchLocalStorage();
//     }
// }

// startProject();