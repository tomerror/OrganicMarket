import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './Customer.module.css';
import axios from 'axios';
import moment from 'moment';
import { Cubes, History } from '../../components';
import utils from '../../utils';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

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
        this.props.fetchPaymentHistory(this.props.user.username, this.props.user.password);
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
            message: this.props.user.paymentHistory.length
        }, {
            title: "Email",
            color: styles.c52796f,
            message: this.props.user.email
        }, {
            title: "Address",
            color: styles.c354f52,
            message: this.props.user.address
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
                        <History orders={this.props.user.paymentHistory} />
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

const mapDispatchToProps = dispatch => {
    return {
        fetchPaymentHistory: (username, password) => dispatch(actionCreators.fetchPaymentHistory(username, password))
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Customer);