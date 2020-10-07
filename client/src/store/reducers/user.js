import * as actionsTypes from '../actions/actionTypes';

const initialState = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    admin: false,
    creation_date: '',
    error: '',
    logs: [],
    paymentHistory: []
}


// push is bad practice. instead we should create a new copy by concat and not rely on the original as push does.
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.SET_NEW_USER:
            return {
                ...state,
                username: action.payload.username,
                password: action.payload.password,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                address: action.payload.address,
                admin: action.payload.admin,
                creation_date: action.payload.creation_date
            }
        case actionsTypes.LOGOUT_USER:
            return {
                ...state,
                username: '',
                password: '',
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                admin: false,
                creation_date: ''
            }
        case actionsTypes.FETCH_DETAILS_FAILED:
            return {
                ...state,
                error: action.error
            }
        case actionsTypes.FETCH_ADMIN_DATA:
            return {
                    ...state,
                    logs: action.logs
                }
        case actionsTypes.FETCH_PAYMENT_HISTORY:
            return {
                ...state,
                paymentHistory: action.value
            }
    }
    return state;
}

export default reducer;