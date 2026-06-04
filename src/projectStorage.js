// IIFE
export default (function projectStorage() {
    // array to store Project objects
    const projectsList = [];

    // Methods to add/remove projects in the list
    const addProject = (projectObject) => {
        projectsList.push(projectObject);

        console.log(`Added ${projectObject.getProjectName()}`);
    }

    const removeProject = (projectID) => {
        // Same approach with toDoList
        const index = projectsList.findIndex(project => project.getProjectID() === projectID);

        // index == -1 means the project is not inside the list
        if( index !== -1 ) {
            // remove the project
            projectsList.splice(index, 1);
        }

        console.log(`Removed`);
    }

    const getProjectList = () => projectsList;

    return { addProject, removeProject, getProjectList }
})();
