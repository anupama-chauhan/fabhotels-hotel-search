const initialState = {
    hotelData: {}
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'fetch/hotelData': {
            return {
                ...state,
                hotelData: action.payload,
            }
        }
        default:
            return state;
    }
}