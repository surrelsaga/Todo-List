// import "./styles.css";

// Goal: working todo core logic in console
import { createProject } from "./createProject.js";
import projectStorage from "./projectStorage.js"


// Code to test the projectStorage

// projectStorage is an IIFE so it's already an object

// create project object instance
const cleanHouse = createProject('Clean House');

// add project into the storage
projectStorage.addProject(cleanHouse);

// check the project list
console.log( projectStorage.getProjectList() );

// remove the project object
projectStorage.removeProject("placeholder");

// check the project again
console.log( projectStorage.getProjectList() );



