// import "./styles.css";

// Goal: working todo core logic in console
import { createToDo } from "./createToDo.js"

const myToDo = createToDo('Do math HW', 'Need to finish by this week', '2-June-2026', 'high')

// test
console.log( myToDo.getTitle() );
console.log( myToDo.getStatus() );
console.log( myToDo.getDesc() );

myToDo.editTitleTo('Dont do math HW');
console.log( myToDo.getTitle() );

myToDo.toggleStatus();
console.log( myToDo.getStatus() );

myToDo.editDescTo('');
console.log( myToDo.getDesc() );



