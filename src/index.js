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

// redisplay all the projects
projectStorage.getProjectList().forEach(project => displayer.displayProject(project));
// display the waiting screen for the main body
displayer.displayEmptyState();

// Create some example projects to verify if data can survive in the localStorage

// // init one project
// const cleanHouse = createProject('Clean House');
// cleanHouse.appendToDo('mop the floor', 'nothing', '2026-06-06', 'high');
// cleanHouse.appendToDo('tidy up the bed', 'before I sleep', '2029-06-07', 'low');

// // init another one
// const learnDDW = createProject('Learn DDW');
// learnDDW.appendToDo('do HW PS', 'before monday', '10-Jun-2026', 'high');

// // Add to projectStorage
// projectStorage.addProject(cleanHouse);
// displayer.displayProject(cleanHouse);
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

    // intialize the project object (whitespaces will be trimmed off)
    const project = createProject( projectNameInput.value.trim() );

    // display the project item in the explorer body
    displayer.displayProject(project);

    // add to projectStorage
    projectStorage.addProject(project);

    // save to localStorage
    storageProcessor.saveToLocalStorage( projectStorage.getProjectList() );

    // clear the input box before closing the project modal
    projectNameInput.value = '';

    // Then close the project modal
    displayer.removeAddProjectModal();
});

btnCancelProject.addEventListener('click', () => {
    // close the project modal
    displayer.removeAddProjectModal();
});

const explorerBody = displayer.getExplorerBody();

//target elements in the todo modal when addToDoBtn is clicked (similar to how btnAddProject works)
const btnConfirmToDo = document.querySelector('#btnConfirmTodo');
const btnCancelToDo = document.querySelector('#btnCancelTodo');

// Remember which project the "+" was clicked on, so the Confirm button
// (which lives in the modal, not in a project item) knows where to add the todo.
let activeProject = null;

// EVENT DELEGATION: one big papa shares listener with his children
explorerBody.addEventListener('click', (event) => {
    // target the chevron and the project item
    const chevron = event.target.closest('.chevron');
    const projectHeader = event.target.closest('.project-header');
    
    // target the clicked todo item
    // altho we have many todo items, but only the one that is clicked, its listener will be triggered
    const todoItem = event.target.closest('.todo-item');

    // if user clicks a todo item, open its editor and stop here. 
    // (can not let the listener for projectHeader happens at the same time)
    // a todo item lives in .todo-list (a sibling of .project-header),
    // so projectHeader is null on these clicks — handle it before any
    // projectHeader-dependent code below, and return so we don't also
    // open the project editor.
    if (todoItem) {
        // retrieve project and todo ids
        const todoID = todoItem.getAttribute('data-todo-id');
        const projectID = todoItem.getAttribute('data-project-id');

        // look for that project and the targeted todo
        const project = projectStorage.getProjectList().find(project => project.getProjectID() === projectID);
        const todo = project.getToDoList().find(toDo => toDo.getID() === todoID);

        // display the todoEditor
        displayer.displayTodoEditor(project, todo);

        // end the listener
        return;
    }

    // if user clicks into empty space inside explorerBody, just do nothing
    if (!projectHeader) return;

    // target the buttons to (add todo) + (delete project)
    const addToDoBtn = event.target.closest('[data-action="add-todo"]');
    const deleteProjectBtn = event.target.closest('[data-action="delete-project"]');

    // extract the id of the currently project that the user is on
    const projectID = projectHeader.getAttribute('data-project-id');
    // Search the todo list of the project
    const project = projectStorage.getProjectList().find(project => project.getProjectID() === projectID);
    const toDoList = project.getToDoList();

    // if user click chevron
    if (chevron) {
        // open/close the chevron and the todoList
        if (chevron.classList.contains('open')) {
            // chevron -> in closed state
            chevron.classList.remove('open');
            // clear the todoItems
            displayer.clearToDo(projectID);
        } else {
            // chevron -> in open state
            chevron.classList.add('open');
            // display the todos
            displayer.displayToDo(projectID, toDoList);
        }

        // chevron is inside project-header, so clicking chevron also means clicking project header
        // the only way to differentiate is to exit the listener if the chevron is clicked
        // then the condition for clicking projectHeader never gets checked, so only todo list is shown
        return;
    }

    // if user clicks add ToDo
    if (addToDoBtn) {
        // remember which project we're adding to, then display the toDo modal
        activeProject = project;
        displayer.showAddToDoModal();

        // the listener stops immediately
        return;
    }

    // if user clicks remove Project
    if (deleteProjectBtn) {
        displayer.removeDisplayProject(projectID);

        // remove from project Storage
        projectStorage.removeProject(projectID)

        // update to localStorage
        storageProcessor.saveToLocalStorage( projectStorage.getProjectList() );

        // the listener stops immediately
        return;
    }

    // if user clicks on the empty space of the project item
    if (projectHeader) {
        let numberOfTasksDone = 0;
        let numberOfTasksUnDone = 0;

        toDoList.forEach(task => {
            if (task.getStatus() === false) numberOfTasksUnDone += 1;
            else numberOfTasksDone += 1
        });

        displayer.displayProjectEditor(project, numberOfTasksDone, numberOfTasksUnDone);

        return;
    }
});

// After the toDo modal appears, if user clicks confirm (create)
// btnConfirmToDo is outside of explorerBody because it is not a child
// of explorerBody, so it does not share with it the same listener
btnConfirmToDo.addEventListener('click', () => {
    // nothing to add to if no project is active
    if (!activeProject) return;

    // read value input
    const toDoTitleInput = document.querySelector('#newTodoTitle');

    // if user don't put anything that is not string
    if (toDoTitleInput.value.trim() === '') {
        // close the modal
        displayer.removeAddToDoModal();

        // nothing happens, end the listener
        return;
    }

    // create the todo Object
    // because we only take the todo title, other properties will be defaulted to some values ('').
    // User can edit later
    activeProject.appendToDo(toDoTitleInput.value.trim(), '', '', 'medium');

    // save the new todo to localStorage
    storageProcessor.saveToLocalStorage( projectStorage.getProjectList() );

    //At here, confirm that the input was valid and a new todo was added
    // the todo count of the project must be incremented
    let newToDoCount = activeProject.getToDoList().length;
    displayer.updateToDoCountInProject(activeProject.getProjectID(), newToDoCount);

    const projectID = activeProject.getProjectID();

    // Only display the new todo if the chevron is open.
    // If it's collapsed, no need to render — it'll show when the user expands it.
    const chevron = document.querySelector(`.project-header[data-project-id="${projectID}"] .chevron`);
    if (chevron && chevron.classList.contains('open')) {
        // clear the old todo items list first
        displayer.clearToDo(projectID);

        // rerender all todo items
        displayer.displayToDo(projectID, activeProject.getToDoList());
    }

    // clear the input and close the modal
    toDoTitleInput.value = '';
    displayer.removeAddToDoModal();
    activeProject = null;
});

// if user clicks cancel, just close the modal
btnCancelToDo.addEventListener('click', () => {
    displayer.removeAddToDoModal();
    activeProject = null;
});

// THIS IS THE EVENT DELEGATION: the parent element will be the mainbody
// Save buttons for project/todo editor will receive listeners from this element
const mainBody = displayer.getMainBody();

mainBody.addEventListener('click', (event) => {
    // save button of project editor
    const saveProjectBtn = event.target.closest('[data-action="save-project"]');

    // All elements related to the todo editor
    // what actually get clicks on the checkbox is the input area, not the status-option label
    const statusCheckBox = event.target.closest('#editStatus');
    // checkbox for priority
    const priorityOption = event.target.closest('.priority-option');
    // save button of todo editor
    const saveToDoBtn = event.target.closest('[data-action="save-todo"]');

    if (priorityOption) {
        // whenever a priority checkbox is checked, clear all the span text content
        const prioritySpan = [...document.querySelectorAll('.radio-box')];
        prioritySpan.forEach(span => span.textContent = '');

        // target the span of the only priority option that was clciked
        const targetedSpan = priorityOption.querySelector('.radio-box');
        targetedSpan.textContent = '✓';
    }

    if (statusCheckBox) {
        const statusToggle = statusCheckBox.closest('.status-option');
        const checkBoxSymbol = statusToggle.querySelector('.check-box');
        const statusText = statusToggle.querySelector('#status-text');

        if (statusCheckBox.checked) {
            checkBoxSymbol.textContent = '✓';
            statusText.textContent = 'Completed';
        } else if (!statusCheckBox.checked) {
            checkBoxSymbol.textContent = '';
            statusText.textContent = 'Undone';
        }
    }

    // This part belongs to the project editor
    if (saveProjectBtn) {
        const projectTitleInput = mainBody.querySelector('#editProjectName').value;

        // verify the title input
        if( projectTitleInput.trim() === '' ) {
            // closes the project editor
            displayer.displayEmptyState();

            // stop the listener
            return;
        }

        // extract the id of the currently project that the user is on
        const projectID = saveProjectBtn.getAttribute('data-project-id');
        // Search the todo list of the project
        const project = projectStorage.getProjectList().find(project => project.getProjectID() === projectID);

        // update the new name to the project
        project.editProjectName( projectTitleInput.trim() );

        // save updated project title to localStorage
        storageProcessor.saveToLocalStorage( projectStorage.getProjectList() );

        // update the DOM display
        displayer.updateProjectTitle( projectID, projectTitleInput.trim() );

        // closes the project editor
        displayer.displayEmptyState();

        return;
    }

    // This part belongs to the todo editor
    if (saveToDoBtn) {
        // retrieve project and todo ids
        const todoID = saveToDoBtn.getAttribute('data-todo-id');
        const projectID = saveToDoBtn.getAttribute('data-project-id');
        // look for that project and the targeted todo
        const project = projectStorage.getProjectList().find(project => project.getProjectID() === projectID);
        const todo = project.getToDoList().find(toDo => toDo.getID() === todoID);

        // when the user clicks save
        // #1: retrieve all the values of inputs
        const newTitle = mainBody.querySelector('#editTitle').value;
        const newDesc = mainBody.querySelector('#editDesc').value;
        // duedate return value will be in the 'yyyy-mm-dd' format
        const newDueDate = mainBody.querySelector('#editDueDate').value;
        const newPriority = mainBody.querySelector('input[name="priority"]:checked').value;
        // this checked returns the status of the checkbox (true if checkbox is checked and otherwise)
        const newStatus = mainBody.querySelector('#editStatus').checked;

        // #2: redisplay the todo item title + priority dot
        const oldPriority = todo.getPriority(); // get the old priority to add class '${priority}' dynamically
        const oldStatus = todo.getStatus(); // get the old status to add class 'done' dynamically
        displayer.updateToDoDisplay(projectID, todoID, newTitle, newPriority, oldPriority, newStatus, oldStatus);

        // #3: update the todo
        todo.editTitleTo(newTitle);
        todo.editDescTo(newDesc);
        todo.editDueDateTo(newDueDate);
        todo.editPriorityTo(newPriority);
        todo.editStatusTo(newStatus);

        // #4: update the todo 
        // meaning updating the project 
        // meaning updating the projectStorage alr
        // just need to save to localStorage
        storageProcessor.saveToLocalStorage( projectStorage.getProjectList() );

        // #5: close the todo editor
        displayer.displayEmptyState();;

        return;
    }
});
