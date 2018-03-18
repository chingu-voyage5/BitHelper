const REMOVE_PROJECT = 'REMOVE_PROJECT';
const SET_PROJECTS = 'SET_PROJECTS';

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

export {removeProject, setProjects};