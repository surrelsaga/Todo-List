// import "./styles.css";

// Goal: working todo core logic in console
import { createProject } from "./createProject.js";

let exampleProject = createProject('DataDriven');

exampleProject.appendToDo("Do-week-01-cohort-PS", "nothing", "11-May-2027", 'high');
exampleProject.appendToDo("Do week 02 cohort PS", "bruhhLmao", "12-May-2027", 'low');
console.log( exampleProject.getProjectName() );
exampleProject.editProjectName('DDW');
console.log( exampleProject.getProjectName() );

console.log( exampleProject.getToDoList() );

exampleProject.getToDoList().forEach( item => {
    if( item.getTitle()  === 'Do-week-01-cohort-PS' ) {
        item.editTitleTo('test')
    }
});

exampleProject.getToDoList().forEach(item => console.log(item.getTitle()));

