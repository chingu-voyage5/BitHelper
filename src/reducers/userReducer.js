function userReducer (state = {}, action) {
    switch(action.type) {
        case 'UPDATE_USER': 
            return state;


        case 'SET_USER':

            const user = action.user;
            return {
                ...state,
                user
            };

        default:
            return state;
    }
}

export default userReducer;