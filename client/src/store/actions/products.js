import * as actionTypes from './actionTypes';
import axios from 'axios';


export const addProduct = (value) => {
    return {
        type: actionTypes.ADD_PRODUCT,
        products: value
    }
}

export const fetchProductsFailed = (value) => {
    return {
        type: actionTypes.FETCH_PRODUCT_FAILED,
        error: value
    };
}

export const getProducts = (username, password) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: `http://localhost:4000/data/shop`,
            data: { username: username, password: password }
        })
            .then(response => {
                dispatch(addProduct(response.data))
            })
            .catch(error => {
                dispatch(fetchProductsFailed(error))
            })
    }
}
export const updateProductFailed = (value) => {
    return {
        type: actionTypes.UPDATE_CART_FAILED,
        error: value
    };
}

export const saveProductDiscount = (value) => {
    return {
        type: actionTypes.SET_PRODUCT_DISCOUNT,
        product: value,
        error: ''
    }
}
export const setProductDiscount = (username, password, product) => {
    return dispatch => {
        axios({
            method: 'post',
            url: `http://localhost:4000/manage/discount`,
            data: { username: username, password: password, product: product }
        })
            .then(response => {
                dispatch(saveProductDiscount(product))
            })
            .catch(error => {
                dispatch(updateProductFailed(error))
            })
    }
}

export const saveProductVisibility = (value) => {
    return {
        type: actionTypes.TOGGLE_PRODUCT_VISIBILITY,
        product: value,
        error: ''
    }
}

export const toggleProductVisibility = (username, password, product) => {
    return dispatch => {
        axios({
            method: 'post',
            url: `http://localhost:4000/manage/productVisibility`,
            data: { username: username, password: password, product: product }
        })
            .then(response => {
                dispatch(saveProductVisibility(product))
            })
            .catch(error => {
                dispatch(updateProductFailed(error))
            })
    }
}

export const saveIncrementProductSupply = (value) => {
    return {
        type: actionTypes.INCREMENT_PRODUCT_SUPPLY,
        product: value,
        error: ''
    }
}

export const incrementProductSupply = (username, password, product) => {
    return dispatch => {
        axios({
            method: 'post',
            url: `http://localhost:4000/manage/supplyInc`,
            data: { username: username, password: password, product: product }
        })
            .then(response => {
                dispatch(saveIncrementProductSupply(product))
            })
            .catch(error => {
                dispatch(updateProductFailed(error))
            })
    }
}

export const saveDecrementProductSupply = (value) => {
    return {
        type: actionTypes.DECREMENT_PRODUCT_SUPPLY,
        product: value,
        error: ''
    }
}

export const decrementProductSupply = (username, password, product) => {
    return dispatch => {
        axios({
            method: 'post',
            url: `http://localhost:4000/manage/supplyDec`,
            data: { username: username, password: password, product: product }
        })
            .then(response => {
                dispatch(saveDecrementProductSupply(product))
            })
            .catch(error => {
                dispatch(updateProductFailed(error))
            })
    }
}

