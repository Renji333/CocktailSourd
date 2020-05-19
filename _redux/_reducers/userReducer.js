function manageUser(state = initialState, action) {

    let nextState;

    switch (action.type) {

        case 'SET_AVATAR':
            nextState = {
                ...state,
                user: {
                    ...state.user, // copy the nested object (level 1)
                    avatar: action.value
                }
            };
            return nextState || state;

        // Others

        case 'RESET':
            nextState = {
                ...state,
                user: initialState.user
            };
            return nextState || state;

        default:
            return state

    }

}

const initialState = { user: {

        avatar: '',

    }
};

export default manageUser
