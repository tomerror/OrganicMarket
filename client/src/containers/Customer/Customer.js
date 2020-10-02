import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './Customer.module.css';
import axios from 'axios';
import moment from 'moment';
import { Cubes, History } from '../../components';
import utils from '../../utils';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class Customer extends Component {
    state = {
        orders: []
    }

    componentDidMount = () => {
        if(this.props.user.username != ''){
            this.getPayments();
        }
    }

    getPayments = () => {
        this.props.clearError();
        axios({
            method: 'post',
            url: 'http://localhost:4000/payment/getPayments',
            headers: {},
            data: { username: this.props.user.username, password: this.props.user.password }
        }).then((response) => {
            this.setState({ orders: response.data })
        }, (error) => {
            let err = ''
            try { err = error.response.data }
            catch (error) { err = "A problem occurred at the server. Please try later" }
            finally { this.props.setError(err) }
        })
    }

    render() {
        let cubes = [{
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
            message: "dd",//this.context.user.email.split('@')[0],
            submessage: "dd",//'@' + this.context.user.email.split('@')[1]
        }, {
            title: "Address",
            color: styles.c354f52,
            message: "dd",//this.context.user.address.split(',')[0],
            submessage: "dd",//this.context.user.address.split(',')[1]
        }]


        return (
            <div className={styles.frame}>
                { this.props.user.username == '' ? <Redirect to="/login" /> :
                    <div>
                        <div className={styles.personalDetails}>
                            <div className={styles.name}>
                                {utils.capitalize(this.props.user.firstName)} {utils.capitalize(this.props.user.lastName)}
                            </div>
                        </div>
                        <div className={styles.cubesDiv}>
                            <Cubes cubes={cubes} />
                        </div>
                        <History orders={this.state.orders} />
                    </div>
                }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Customer);