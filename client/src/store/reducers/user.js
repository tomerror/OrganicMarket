import * as actionsTypes from '../actions';

const initialState = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    admin: false,
    creation_date: ''
}


// push is bad practice. instead we should create a new copy by concat and not rely on the original as push does.
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.SET_NEW_USER:
            return {
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
                username: '',
                password: '',
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                admin: false,
                creation_date: ''
            }
    }
    return state;
}

export default reducer;