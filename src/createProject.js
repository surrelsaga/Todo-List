import { createToDo } from "./createToDo.js"

export function createProject(name) {
    let projectName = name;

    let toDoList = [];

    // METHODS TO GET PROJECT NAME AND TODO LIST
    const getProjectName = () => projectName;
    const getToDoList = () => toDoList;

    // METHODS TO EDIT PROJECT NAME AND TODO LIST
    const editProjectName = (newName) => {
        projectName = newName;
    }

    const appendToDo = (title, description, dueDate, priority) => {
        let toDoTask = createToDo(title, description, dueDate, priority);

        // Assign a unique Id for each book to prevent issues when books properties are identical
        const uuid = crypto.randomUUID();
        toDoTask['id'] = uuid;

        // Put in the todoList
        toDoList.push(toDoTask);
    }

    // this taskId is the ID that we will get from data-id attribute from the todoTask element in html
    const removeToDo = (taskId) => {
        const index = toDoList.findIndex(item => item['id'] === taskId);

        // -1 if not found, if the item is found then:
        if (index !== -1) {
            // remove the task
            toDoList.splice(index, 1);
        }
    }

    return { getProjectName, getToDoList, editProjectName, appendToDo, removeToDo };
}
