export function createToDo(title, description, dueDate, priority, status, id) {
    let taskTitle = title;
    let taskDesc = description;
    let taskDueDate = dueDate;
    let taskPriority = priority;

    // to track if the task is done or not
    let taskStatus;

    // If it is about rebuilding an existing toDoTask, we need to know the status
    if (status == undefined) {
        // this means this is a new todo so it should be not done
        taskStatus = false;
    } else {
        taskStatus = status;
    }

    let taskID;

    // In the case where entry modules call the function to rebuild objects from rawData
    // the toDo Object will already have an ID
    if (id == undefined) {
        // Assign a unique Id for each toDo to prevent issues when toDos properties are identical
        taskID = crypto.randomUUID();
    } else {
        taskID = id;
    }

    // METHODS TO GET THE PROPERTIES
    const getTitle = () => taskTitle;
    const getDesc = () => taskDesc;
    const getDueDate = () => taskDueDate;
    const getPriority = () => taskPriority;
    const getStatus = () => {
        return taskStatus;
    }
    const getID = () => taskID;

    // Since a ToDo always have the above properties, we never need to remove them (they can be empty)
    // METHODS TO EDIT THE PROPERTIES
    const editTitleTo = (newTitle) => { taskTitle = newTitle };
    const editDescTo = (newDesc) => { taskDesc = newDesc };
    const editDueDateTo = (newDate) => {
        // this is temporary, later need to depends on how the app gets date input
        // then need to reformat to process more easily
        taskDueDate = newDate
    };
    const editPriorityTo = (newLevel) => {
        // this is temporary, we have 3 levels of priority: high, medium, low
        // there will be ways to restrict UI to only toggle between these values in the UI
        taskPriority = newLevel;
    }
    const toggleStatus = () => {
        taskStatus = !taskStatus;
    }

    return { getTitle, getDesc, getDueDate, getPriority, getStatus, getID, editTitleTo, editDescTo, editDueDateTo, editPriorityTo, toggleStatus };
}
