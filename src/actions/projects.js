const ADD_PROJECT = 'ADD_PROJECT';
const REMOVE_PROJECT = 'REMOVE_PROJECT';
const SET_PROJECTS = 'SET_PROJECTS';

function addProject (project) {
    return {
        type: ADD_PROJECT,
        project
    }
};

function removeProject (project) {
    return {
        type: REMOVE_PROJECT,
        project
    }
}

function setProjects (projects) {
    return {
        type: SET_PROJECTS,
        projects
    }
}

export {addProject, removeProject, setProjects};