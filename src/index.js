import './style.css';
import { displayTodo, displayProjectButtons, allTaskButtonAddListener } from './todo_display';
import { loadSampleContent } from './todo_sample_content';

loadSampleContent();
displayTodo();
displayProjectButtons();
allTaskButtonAddListener();
