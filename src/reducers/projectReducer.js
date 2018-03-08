const defaultState = {
    projects: []
};

function projectReducer (state = defaultState, action) {
    switch (action.type) {
        case 'ADD_PROJECT':
            return state;

        case 'SET_PROJECTS':

            return {
                ...state,
                projects: [...action.projects]
            };

        default:
            return state;
    }
}

export default projectReducer;