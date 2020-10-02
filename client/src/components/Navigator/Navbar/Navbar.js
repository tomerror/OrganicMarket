import React from 'react';
import { connect } from 'react-redux';
import Title from '../../Logo/Logo';
import Toolbar from '../Toolbar/Toolbar';
import Errorbar from '../Errorbar/Errorbar';

import './Navbar.css';

const Navbar = (props) => {
    const style = [props.admin ? "admin" : "user", "nav"].join(" ")
    const showErrorBar = props.error != '' ? true: false;
    return (
        <div>
            <div className={style}>
                <Title />
                <Toolbar
                    tabs={props.tabs}
                    searchProduct={(e) => props.searchProduct(e)}
                    logout={() => props.logout()} />
            </div>
            { showErrorBar ? <Errorbar text={props.error} /> : null }        
        </div>
    )
}


const mapStateToProps = state => {
    return {
        admin: state.user.admin
    }
}

export default connect(mapStateToProps)(Navbar);