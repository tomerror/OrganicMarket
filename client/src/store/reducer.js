import * as actionsTypes from './actions';
const initialState = {
    counter: 0
}


// push is bad practice. instead we should create a new copy by concat and not rely on the original as push does.
const reducer = (state = initialState, action) => {
    return state;
}

export default reducer;