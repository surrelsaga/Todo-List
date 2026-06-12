export default (function displayer() {
    // target the project modal
    const projectModal = document.querySelector('#addProjectModal');

    // Target explorer body
    const explorereBody = document.querySelector('#explorerBody');


    //Show the project modal
    const showAddProjectModal = () => {
        projectModal.classList.add('open');
    }

    //Close the project modal
    const removeAddProjectModal = () => {
        projectModal.classList.remove('open');
    }

    // Get the explorerBody
    const getExplorerBody = () => explorereBody;

    //After confirm project, display the project item inside the explorer body
    const displayProject = (project) => {
        const projectName = project.getProjectName();
        const projectID = project.getProjectID();
        const numberOfToDos = project.getToDoList().length;

        explorereBody.insertAdjacentHTML('beforeend', `
        <div class="project-item">
            <div class="project-header" data-project-id=${projectID}>
            <div class="project-header-left">
                <span class="chevron">&#9658;</span>
                <span class="project-name">${projectName}</span>
                <span class="project-count">${numberOfToDos}</span>
            </div>
            <div class="project-actions">
                <button class="action-btn" data-action="add-todo" data-project-id=${projectID}>+</button>
                <button class="action-btn danger" data-action="delete-project" data-project-id=${projectID}>x</button>
            </div>
            </div>
            <div class="todo-list">
            </div>
            <div class="explorer-divider"></div>
        </div>
        `);
    }

    // to display todo, the displayer needs to know
    // 1. ID => to detect the exact todo-list to append html code
    // 2. ToDo list => to know how many of todos and what information to add
    const displayToDo = (projectID, todoList) => {
        // look for the header with correct ID, walks up to the parent element and find inside the parent element the todo list
        const todoDOM = document.querySelector(`.project-header[data-project-id=${projectID}]`)
                                .closest('.project-item')
                                .querySelector('.todo-list');

        todoDOM.classList.add('open');

        // receive todoList from entry module
        // format: [todoObject01, todoObject02, ...]
        todoList.forEach(todo => {
            const id = todo.getID();
            const name = todo.getTitle();
            const status = todo.getStatus();
            const priority = todo.getPriority();

            if (status === false) {
                todoDOM.insertAdjacentHTML('beforeend', `
                <div class="todo-item" data-todo-id=${id} data-project-id=${projectID}>
                    <div class="todo-checkbox">&#10003;</div>
                    <span class="todo-title">${name}</span>
                    <span class="priority-dot" class=${priority}></span>
                </div>
                `);
            } else if (status === true) {
                todoDOM.insertAdjacentHTML('beforeend', `
                <div class="todo-item" data-todo-id=${id} data-project-id=${projectID}>
                    <div class="todo-checkbox done">&#10003;</div>
                    <span class="todo-title done">${name}</span>
                    <span class="priority-dot" class=${priority}></span>
                </div>
                `);
            }
        });
    }

    return { getExplorerBody, showAddProjectModal, removeAddProjectModal, displayProject, displayToDo };
})();
