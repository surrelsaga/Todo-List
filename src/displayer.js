export default (function displayer() {

    const btnAddProject = document.querySelector('#btnAddProject');

    // Target all DOM elements of the project modal
    const projectModal = document.querySelector('#addProjectModal');
    const btnConfirmProject = document.querySelector('#btnConfirmProject');
    const btnCancelProject = document.querySelector('#btnCancelProject');

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

    //After confirm project, display the project item inside the explorer body
    const displayProject = (project) => {
        const projectName = project.getProjectName();
        const projectID = project.getProjectID();
        const numberOfToDos = project.getToDoList().length;

        explorereBody.insertAdjacentHTML('beforeend', `
        <div class="project-item">
            <div class="project-header" data-project-id=${projectID}>
            <div class="project-header-left">
                <span class="chevron open">&#9658;</span>
                <span class="project-name">${projectName}</span>
                <span class="project-count">${numberOfToDos}</span>
            </div>
            <div class="project-actions">
                <button class="action-btn" data-action="add-todo" data-project-id=${projectID}>+</button>
                <button class="action-btn danger" data-action="delete-project" data-project-id=${projectID}>x</button>
            </div>
            </div>
            <div class="todo-list open">
            </div>
            <div class="explorer-divider"></div>
        </div>
        `);
    }

    return { showAddProjectModal, removeAddProjectModal, displayProject };
})();
