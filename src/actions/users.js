const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';

function addUser (user) {
    return {
        type: ADD_USER,
        user
    }
}

function removeUser (user) {
    return {
        type: REMOVE_USER,
        user
    }
}

export {addUser, removeUser};