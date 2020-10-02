import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import styles from './Login.module.css';
import LockIcon from '@material-ui/icons/Lock';
import { Signin, Signup, LoginFooter } from '../../components';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class Login extends Component {
    state = {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        remember: false,
        email: '',
        address: '',
        form: "Sign in",
        error: "",
        pastReload: false
    }

    componentDidMount = () => {
        console.log(this.props)
        const user = cookie.load('username')
        const pass = cookie.load('password')
        if ((user != undefined) && (pass != undefined)) {
            this.setState({ pastReload: true })
            this.SignIn(user, pass)
        }
    }

    toggleSign = () => {
        this.clearError();
        this.setState({ form: this.state.form == "Sign in" ? "Sign up" : "Sign in" })
    }

    checkSign = (v) => {
        this.setState({ remember: v })
    }

    handleChange = (s) => {
        this.setState(s)
    }

    setError = (err) => {
        this.setState({ error: err })
    }

    clearError = () => {
        this.setState({ error: "" })
    }

    SignIn = (user, pass) => {
        this.clearError()
        axios({
            method: 'post',
            url: 'http://localhost:4000/auth/getDetails',
            headers: {},
            data: { username: user, password: pass }
        }).then((response) => {
            if (response) {
                this.approvedDetails(response.data)
            }
        }, (error) => {
            let err = ''
            try { err = error.response.data }
            catch (error) { err = "A problem occurred at the server. Please try later" }
            finally { this.setState({ error: err }) }
        });
    }

    SignUp = () => {
        this.clearError()
        let user = {
            username: this.state.username,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            address: this.state.address
        }
        user.admin = 0
        user.creation_date = moment().format("YYYY/MM/DD")

        axios({
            method: 'post',
            url: 'http://localhost:4000/auth/create',
            headers: {},
            data: user
        }).then((response) => {
            this.approvedDetails(user);
        }, (error) => {
            let err = ''
            try { err = error.response.data }
            catch (error) { err = "A problem occurred at the server. Please try later" }
            finally { this.setState({ error: err }) }
        });
    };

    approvedDetails = (user) => {
        this.props.setNewUser(user)
        if (!this.state.pastReload) {
            if (this.state.remember) {
                cookie.save('username', user.username, { path: '/' })
                cookie.save('password', user.password, { path: '/' })
            }
            else {
                cookie.save('username', user.username, { path: '/', maxAge: 60 * 30 })
                cookie.save('password', user.password, { path: '/', maxAge: 60 * 30 })
            }
        }
        this.props.login().then(response => {
            this.props.history.push(`/shop/${response}`);
        });

    }

    render = () => {
        let formBody = null;
        if (this.state.form == "Sign in") {
            formBody =
                <Signin onChange={(e) => this.handleChange(e)} />
        } else {
            formBody =
                <Signup onChange={(e) => this.handleChange(e)} />
        }

        return (
            <div>
                <div className={styles.LeftPanel}>
                    <img src={require('../../assets/big_logo.png')} alt="" className={[styles.Logo, styles.LogoCenter].join(' ')} />
                </div>
                <div className={styles.RightPanel}>
                    <div className={styles.LoginCenter}>
                        <div className={styles.Header}>
                            <LockIcon className={styles.LockIcon} />
                            <div className={styles.Title}>
                                {this.state.form}
                            </div>
                        </div>

                        {formBody}

                        <LoginFooter
                            inputText="Remeber Me"
                            checkboxFunc={(v) => this.checkSign(v)}
                            buttonText={this.state.form == "Sign in" ? "Login" : "Register"}
                            changeScreenText={this.state.form == "Sign in" ? "Don't have an account? Sign Up" : "Already have an account? Sign in"}
                            click={this.state.form == "Sign in" ? () => this.SignIn(this.state.username, this.state.password) : () => this.SignUp()}
                            error={this.state.error}
                            sign={() => this.toggleSign()} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setNewUser: (user) => dispatch({
            type: actionTypes.SET_NEW_USER, payload: {
                username: user.username,
                password: user.password,
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email,
                address: user.address,
                admin: user.admin == "1" ? true : false,
                creation_date: user.creation_date
            }
        })
    }
}

export default connect(null, mapDispatchToProps)(Login);
