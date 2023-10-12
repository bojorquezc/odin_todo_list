import './style.css';
import { allTaskButtonAddListener } from './todo_manager';
import { displayTodo, displayProjectButtons } from './todo_display';
import { showDialog, hideDialog, pushToDo } from './todo_form_control';
import { loadSampleContent } from './todo_sample_content';

loadSampleContent();
displayTodo();
displayProjectButtons();
allTaskButtonAddListener();
