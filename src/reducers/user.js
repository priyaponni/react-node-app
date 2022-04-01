
const reducer = function(state = {}, action) {
    switch(action.type) {
        case 'EDIT_USER':
            return {
                ...state,
                originalUser: {
                    ...action.payload
                },
                user: {
                    ...state.user,
                    ...action.payload
                }
            }
        case 'EDIT_PROPERTY': 
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.payload.item]: action.payload.val
                }
            }
        default:
            return state;
    }
}

export default reducer;

