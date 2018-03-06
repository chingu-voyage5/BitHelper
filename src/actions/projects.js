const ADD_PROJECT = 'ADD_PROJECT';
const REMOVE_PROJECT = 'REMOVE_PROJECT';

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


export {addProject, removeProject};