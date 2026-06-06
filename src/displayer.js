export default (function displayer() {
    let projectModal = null;

    // first is to show the project modal when the add project buttons is clicked
    const showAddProjectModal = () => {
        projectModal.classList.add('open');
    }


    const init = () => {
        const btnAddProject = document.querySelector('#btnAddProject');
        projectModal = document.querySelector('#addProjectModal');

        btnAddProject.addEventListener('click', showAddProjectModal);
    }

    return { init };
})();
