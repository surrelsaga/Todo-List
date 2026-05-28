export function createToDo(title, description, dueDate, priority) {
    let taskTitle = title;
    let taskDesc = description;
    let taskDueDate = dueDate;
    let taskPriority = priority;

    // By default, it's supposed to be a toDo task so it should be not done yet
    let taskStatus = false;

    // METHODS TO GET THE PROPERTIES
    const getTitle = () => taskTitle;
    const getDesc = () => taskDesc;
    const getDueDate = () => taskDueDate;
    const getPriority = () => taskPriority;
    const getStatus = () => {
        return (taskStatus === true) ? 'Done' : 'Not Done';
    }

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

    return { getTitle, getDesc, getDueDate, getPriority, getStatus, editTitleTo, editDescTo, editDueDateTo, editPriorityTo, toggleStatus };
}
