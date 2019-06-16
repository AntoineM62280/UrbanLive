const initialState = { id: "" };

function Auth(state = initialState, action) {
    let nextState = { ...state };
    switch (action.type) {
        case "LOGIN":
        	nextState = {
                ...state,
                userId: action.value
            }
            return nextState;
        default:
            return state;
    }
}

export default Auth;