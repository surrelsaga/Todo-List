// We just need exactly one instance of process
// IIFE
export default (function storageProcessor() {
    // Methods to build raw Data before sending it to local Storage
    const buildRawData = (projectList) => {
        const rawData = []

        // first loop through all the Project objects
        projectList.forEach(project => {
            const todoObjectsList = [];
            
            // Build an array which will stores all toDo Objects
            // properties to be stored: id, title, desc, dueDate, priority, status
            project.getToDoList().forEach(toDo => {
                todoObjectsList.push(
                    {
                        id: toDo['id'],
                        title: toDo.getTitle(),
                        desc: toDo.getDesc(),
                        dueDate: toDo.getDueDate(),
                        priority: toDo.getPriority(),
                        status: toDo.getStatus(),
                    }
                );
            });

            // Add all the Project objects to the raw data array
            rawData.push(
                {
                    id: project.getProjectID(),
                    name: project.getProjectName(),
                    todos: todoObjectsList
                }
            );
        });

        return rawData;
    }

    // Method to reformat plain data as JSON and save to localStorage
    const saveToLocalStorage = (projectList) => {
        // Convert the project list to the desired data format
        const dataToStringfiy = buildRawData(projectList);

        // Convert data to JSON
        const myJSON = JSON.stringify(dataToStringfiy);

        // Save data to localStorage
        localStorage.setItem("projects", myJSON);
    }

    // Method to load from localStorage
    const loadFromLocalStorage = () => {
        // retrieve JSON from the localStorage
        const myJSON = localStorage.getItem("projects");

        // parse the retrieve JSON
        if (myJSON !== null) {
            const rawData = JSON.parse(myJSON);

            // return this rawData for the entry module to rebuild live objects from it
            return rawData
        } else {
            // If there is no data inside localStorage
            // We return an empty array
            return [];
        }
    }
})();
