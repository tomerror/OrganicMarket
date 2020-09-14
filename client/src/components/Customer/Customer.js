import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
import styles from './Customer.module.css';
import axios from 'axios';
import moment from 'moment';
import History from '../History/History';
import Cubes from '../Cubes/Cubes';
import utils from '../../utils';

class Customer extends Component {
    state = {
        orders: [],
        redirect: null
    }

    componentDidMount = () => {
        this.getPayments();
    }

    getPayments = () => {
        this.props.clearError();
        axios({
            method: 'post',
            url: 'http://localhost:4000/payment/getPayments',
            headers: {},
            data: { username: this.props.user.username, password: this.props.user.password}
            //data: { username: cookie.load('username'), password: cookie.load('password') }
        }).then((response) => {
            this.setState({ orders: response.data })
            this.props.viewPage('customer')
        }, (error) => {
            let err = ''
            try { err = error.response.data }
            catch (error) { err = "A problem occurred at the server. Please try later" }
            finally { this.props.setError(err) }
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        const cubes = [{
            title: "Member",
            color: styles.ccad2c5,
            message: moment().diff(this.props.user.creation_date, "days"),
            submessage: "Days"
        }, {
            title: "Transactions",
            color: styles.c84a98c,
            message: this.state.orders.length
        }, {
            title: "Email",
            color: styles.c52796f,
            message: this.props.user.email.split('@')[0],
            submessage: '@' + this.props.user.email.split('@')[1]
        }, {
            title: "Address",
            color: styles.c354f52,
            message: this.props.user.address.split(',')[0],
            submessage: this.props.user.address.split(',')[1]
        }]
        return (
            <div>
                <div className={styles.personalDetails}>
                    <div className={styles.name}>
                        {utils.capitalize(this.props.user.firstname)} {utils.capitalize(this.props.user.lastname)}
                    </div>
                </div>
                <div className={styles.cubesDiv}>
                    <Cubes cubes={cubes} />
                </div>
                <History orders={this.state.orders} />
            </div>
        )
    }
}

export default Customer;