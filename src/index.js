import "./styles.css";

// Goal: working todo core logic in console
import { createProject } from "./createProject.js";
import projectStorage from "./projectStorage.js"
import storageProcessor from "./storageProcessor.js";
import displayer from "./displayer.js";

// Load from storage
const rawData = storageProcessor.loadFromLocalStorage();

// rebuild live objects
rawData.forEach(project => {
    // rebuild a Project object
    const rebuiltProject = createProject(project.name, project.id);

    // rebuild all todos of the project
    project.todos.forEach(todo => {
        rebuiltProject.loadToDo(todo.title, todo.desc, todo.dueDate, todo.priority, todo.status, todo.id)
    });

    // push the rebuilt Project objects to the project storage
    projectStorage.addProject(rebuiltProject);
});

// Create some example projects to verify if data can survive in the localStorage

// // init one project
// const cleanHouse = createProject('Clean House');
// cleanHouse.appendToDo('mop the floor', 'nothing', '6-Jun-2026', 'high');
// cleanHouse.appendToDo('tidy up the bed', 'before I sleep', '7-Jun-2029', 'low');

// // init another one
// const learnDDW = createProject('Learn DDW');
// learnDDW.appendToDo('do HW PS', 'before monday', '10-Jun-2026', 'high');

// // Add to projectStorage
// projectStorage.addProject(cleanHouse);
// projectStorage.addProject(learnDDW);

// // Save to localStorage
// storageProcessor.saveToLocalStorage( projectStorage.getProjectList() );

// TEST INITIALIZING AND DISPLAYING A PROJECT THROUGH THE PROJECT MODAL
const btnAddProject = document.querySelector('#btnAddProject');

// Target all DOM elements of the project modal
const btnConfirmProject = document.querySelector('#btnConfirmProject');
const btnCancelProject = document.querySelector('#btnCancelProject');


btnAddProject.addEventListener('click', () => {
    //Show the project modal
    displayer.showAddProjectModal()
});

btnConfirmProject.addEventListener('click', () => {
    const projectNameInput = document.querySelector('#newProjectName');

    // read in the value of the input box first
    // if the input is empty or just contain only whitespaces
    if ( projectNameInput.value.trim() === '') {
        // closes the modal
        displayer.removeAddProjectModal();

        // and then end the event listener
        return;
    }

    // intialize the project object
    const project = createProject( projectNameInput.value );

    // display the project item in the explorer body
    displayer.displayProject(project);

    // Then close the project modal
    displayer.removeAddProjectModal();
});

btnCancelProject.addEventListener('click', () => {
    displayer.removeAddProjectModal();
});


