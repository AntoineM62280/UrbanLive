const initialState = { path: null }

function globals(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'UPDATE_EVENTS':
            nextState = {
                ...state,
                events: action.value
            }
            return nextState

        case 'UPDATE_USER':
            nextState = {
                ...state,
                user: action.value
            }
        return nextState
            
        case 'UPDATE_LOCATION':
            nextState = {
                ...state,
                location: action.value
            }
        return nextState
    }
}

export default globals
