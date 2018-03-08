const ADD_USER = 'ADD_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const SET_USER = 'SET_USER';

function addUser (user) {
    return {
        type: ADD_USER,
        user
    }
}

function logoutUser (user) {
    return {
        type: LOGOUT_USER,
        user
    }
}

function setUser (user) {
    return {
        type: SET_USER,
        user
    }
}

export {addUser, logoutUser, setUser};