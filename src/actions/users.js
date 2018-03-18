const LOGOUT_USER = 'LOGOUT_USER';
const SET_USER = 'SET_USER';

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

export {logoutUser, setUser};