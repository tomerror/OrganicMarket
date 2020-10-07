import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setNewUser = (user) => {
    return {
        type: actionTypes.SET_NEW_USER,
        payload: user
    }
}

export const logoutUser = () => {
    return {
        type: actionTypes.LOGOUT_USER
    }
}
export const fetchDetailsFailed = (value) => {
    return {
        type: actionTypes.FETCH_DETAILS_FAILED,
        error: value
    };
}

export const saveAdminData = (value) => {
    return {
        type: actionTypes.FETCH_ADMIN_DATA,
        logs: value,
        error: ''
    }
}

export const fetchAdminData = (username, password) => {
    return dispatch => {
        axios({
            method: 'post',
            url: `http://localhost:4000/manage/getPanel`,
            data: { username: username, password: password }
        })
            .then(response => {
                dispatch(saveAdminData(response.data))
            })
            .catch(error => {
                dispatch(fetchDetailsFailed(error))
            })
    }
}

export const savePaymentHistory = (value) => {
    return {
        type: actionTypes.FETCH_PAYMENT_HISTORY,
        value: value,
        error: ''
    }
}
export const fetchPaymentHistory = (username, password) => {
    return dispatch => {
        axios({
            method: 'post',
            url: `http://localhost:4000/payment/getPayments`,
            data: { username: username, password: password }
        })
            .then(response => {
                dispatch(savePaymentHistory(response.data))
            })
            .catch(error => {
                dispatch(fetchDetailsFailed(error))
            })
    }
}