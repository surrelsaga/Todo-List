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
        toDoList.push(toDoTask);
    }

    const removeToDo = (taskTitle) => {
        for(let i = 0; i < toDoList.length; i++) {
            if( toDoList[i].getTitle() === taskTitle ){
                toDoList.splice(i, 1);
            }
        }
    }

    return { getProjectName, getToDoList, editProjectName, appendToDo, removeToDo };
}
