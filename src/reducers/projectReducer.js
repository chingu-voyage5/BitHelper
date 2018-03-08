function projectReducer (state = {}, action) {
    switch (action.type) {
        case 'ADD_PROJECT':
            return state;

        case 'SET_PROJECTS':

            const projects = [...action.projects];
            return {
                ...state,
                projects
            };

        default:
            return state;
    }
}

export default projectReducer;