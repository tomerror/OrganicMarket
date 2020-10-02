import * as actionsTypes from '../actions';

const initialState = {
    products: []
}


// push is bad practice. instead we should create a new copy by concat and not rely on the original as push does.
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_PRODUCT:
            return {
                ...state,
                products: state.products.concat(action.products)
            }
    }
    return state;
}

export default reducer;