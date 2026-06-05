import { createToDo } from "./createToDo.js"

export function createProject(name, id) {
    let projectName = name;
    let projectID

    // In the case where entry modules call the function to rebuild objects from rawData
    // the project Object will already have an ID
    if (id === undefined) {
        // the Project creates an ID for itself
        projectID = crypto.randomUUID();
    } else {
        projectID = id;
    }

    let toDoList = [];

    // METHODS TO GET PROJECT NAME/ID AND TODO LIST
    const getProjectName = () => projectName;
    const getProjectID = () => projectID;
    const getToDoList = () => toDoList;

    // METHODS TO EDIT PROJECT NAME AND TODO LIST
    const editProjectName = (newName) => {
        projectName = newName;
    }

    const appendToDo = (title, description, dueDate, priority, status) => {
        let toDoTask = createToDo(title, description, dueDate, priority, status);

        // Put in the todoList
        toDoList.push(toDoTask);
    }

    // this taskId is the ID that we will get from data-id attribute from the todoTask element in html
    const removeToDo = (taskId) => {
        const index = toDoList.findIndex(item => item.getID() === taskId);

        // -1 if not found, if the item is found then:
        if (index !== -1) {
            // remove the task
            toDoList.splice(index, 1);
        }
    }

    // method to rebuild toDo object from raw Data from local Storage
    const loadToDo = (title, description, dueDate, priority, status, id) => {
        let toDoTask = createToDo(title, description, dueDate, priority, status, id);

        // Put in the todoList
        toDoList.push(toDoTask);
    }

    return { getProjectName, getProjectID, getToDoList, editProjectName, appendToDo, removeToDo, loadToDo };
}
