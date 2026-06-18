export default (function displayer() {
    // target the project/todo modal
    const projectModal = document.querySelector('#addProjectModal');
    const todoModal = document.querySelector('#addTodoModal');

    // Target explorer body
    const explorereBody = document.querySelector('#explorerBody');

    // Target the main body for project/todo editor
    const mainBody = document.querySelector('#mainBody');


    //Show the project modal
    const showAddProjectModal = () => {
        projectModal.classList.add('open');
    }

    //Close the project modal
    const removeAddProjectModal = () => {
        projectModal.classList.remove('open');
    }

    //Show the toDo modal
    const showAddToDoModal = () => {
        todoModal.classList.add('open');
    }

    //Close the toDo modal
    const removeAddToDoModal = () => {
        todoModal.classList.remove('open');
    }

    // Get the explorerBody
    const getExplorerBody = () => explorereBody;

    // Get the mainBody
    const getMainBody = () => mainBody;

    //After confirm project, display the project item inside the explorer body
    const displayProject = (project) => {
        const projectName = project.getProjectName();
        const projectID = project.getProjectID();
        const numberOfToDos = project.getToDoList().length;

        explorereBody.insertAdjacentHTML('beforeend', `
        <div class="project-item">
            <div class="project-header" data-project-id="${projectID}">
            <div class="project-header-left">
                <span class="chevron">&#9658;</span>
                <span class="project-name">${projectName}</span>
                <span class="project-count">${numberOfToDos}</span>
            </div>
            <div class="project-actions">
                <button class="action-btn" data-action="add-todo" data-project-id="${projectID}">+</button>
                <button class="action-btn danger" data-action="delete-project" data-project-id="${projectID}">x</button>
            </div>
            </div>
            <div class="todo-list">
            </div>
            <div class="explorer-divider"></div>
        </div>
        `);
    }

    const removeDisplayProject = (projectID) => {
        const projectItemToRemove = document.querySelector(`.project-header[data-project-id="${projectID}"]`)
                                            .closest('.project-item');
        // remove the project
        projectItemToRemove.remove();
    }

    // to display todo, the displayer needs to know
    // 1. ID => to detect the exact todo-list to append html code
    // 2. ToDo list => to know how many of todos and what information to add
    const displayToDo = (projectID, todoList) => {
        // look for the header with correct ID, walks up to the parent element and find inside the parent element the todo list
        const todoDOM = document.querySelector(`.project-header[data-project-id="${projectID}"]`)
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
                <div class="todo-item" data-todo-id="${id}" data-project-id="${projectID}">
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

    const clearToDo = (projectID) => {
        // look for the header with correct ID, walks up to the parent element and find inside the parent element the todo list
        const todoDOM = document.querySelector(`.project-header[data-project-id="${projectID}"]`)
                                .closest('.project-item')
                                .querySelector('.todo-list');

        todoDOM.innerHTML = '';
    }

    const updateToDoCountInProject = (projectID, count) => {
        // look for the projectHeader with the matched ID -> then go up to that project item -> then find the project count of that item
        const toDoCount = document.querySelector(`.project-header[data-project-id="${projectID}"]`)
                                  .closest('.project-item')
                                  .querySelector('.project-count');
    
        toDoCount.textContent = count
    }

    // display the project editor
    const displayProjectEditor = (project, numberOfTasksDone, numberOfTasksUnDone) => {
        mainBody.innerHTML = `
        <div class="project-editor">
            <div class="project-editor-title">// PROJECT_NAME</div>
            <div class="prop-section">
                <label class="prop-label">Project Name</label>
                <input type="text" class="prop-input" id="editProjectName" value="${project.getProjectName()}" style="width:100%;" />
            </div>
            <div class="prop-section" style="color:var(--text-muted); font-size:12px; line-height:2;">
            <span class="prop-label">Stats</span>
                Total tasks &nbsp;&nbsp;&nbsp;${numberOfTasksDone + numberOfTasksUnDone}<br>
                Completed &nbsp;&nbsp;${numberOfTasksDone}<br>
                Remaining &nbsp;&nbsp;${numberOfTasksUnDone}
            </div>
            <button class="btn-save" data-action="save-project" data-project-id="${project.getProjectID()}">[ save ]</button>
        </div>
        `
    }

    // update the project title display
    const updateProjectTitle = (projectID, newName) => {
        // find the correct project header -> walk up to project item -> find the project name display box
        const projectNameDisplay = document.querySelector(`.project-header[data-project-id="${projectID}"]`)
                                           .closest('.project-item')
                                           .querySelector('.project-name');
        projectNameDisplay.textContent = newName;
    }

    // display todo editor
    const displayTodoEditor = (project, toDo) => {
        mainBody.innerHTML = `
  <div class="prop-editor">
    <div class="prop-section">
      <label class="prop-label">Title</label>
      <input type="text" class="prop-input" id="editTitle" value="${toDo.getTitle()}" style="width:100%;" />
    </div>
    <div class="prop-section">
      <label class="prop-label">Description</label>
      <textarea class="prop-input" id="editDesc">${toDo.getDesc()}</textarea>
    </div>
    <div class="prop-section">
      <label class="prop-label">Due Date</label>
      <input type="date" class="prop-input" id="editDueDate" value="${toDo.getDueDate()}"style="width:180px; color-scheme:dark;" />
    </div>
    <div class="prop-section">
      <label class="prop-label">Priority</label>
      <div class="priority-options">
        <label class="priority-option">
          <input type="radio" name="priority" value="low" ${(toDo.getPriority() === 'low') ? 'checked' : ''}>
          <span class="radio-box">✓</span>
          <span class="priority-label">low</span>
        </label>
        <label class="priority-option">
          <input type="radio" name="priority" value="medium" ${(toDo.getPriority() === 'medium') ? 'checked' : ''}>
          <span class="radio-box">✓</span>
          <span class="priority-label">medium</span>
        </label>
        <label class="priority-option">
          <input type="radio" name="priority" value="high" ${(toDo.getPriority() === 'high') ? 'checked' : ''}>
          <span class="radio-box">✓</span>
          <span class="priority-label">high</span>
        </label>
      </div>
    </div>
    <div class="prop-section">
      <label class="prop-label">Status</label>
      <label class="status-option" data-action="toggle-status" data-todo-id="${toDo.getID()}" data-project-id="${project.getProjectID()}">
        <input type="checkbox" id="editStatus" ${toDo.getStatus() === true ? 'checked' : ''}>
        <span class="check-box">${toDo.getStatus() === true ? '✓' : ''}</span>
        <span id="status-text">${toDo.getStatus() === true ? 'Completed' : 'Undone'}</span>
      </label>
    </div>
    <button class="btn-save" data-action="save-todo" data-todo-id="${toDo.getID()}" data-project-id="${project.getProjectID()}">[ save ]</button>
  </div>
        `;
    }

    // update the project title display
    const updateToDoTitle = (projectID, todoID, newName) => {
        // find the correct project header -> walk up to project item -> find the project name display box
        const toDoNameDisplay = document.querySelector(`.project-header[data-project-id="${projectID}"]`)
                                           .closest('.project-item')
                                           .querySelector('.todo-list')
                                           .querySelector(`.todo-item[data-todo-id="${todoID}"]`)
                                           .querySelector('.todo-title');
        toDoNameDisplay.textContent = newName;
    }

    return { getExplorerBody, getMainBody, showAddProjectModal, removeAddProjectModal, showAddToDoModal, removeAddToDoModal, displayProject, removeDisplayProject, displayToDo, clearToDo, updateToDoCountInProject, displayProjectEditor, updateProjectTitle, displayTodoEditor, updateToDoTitle };
})();
