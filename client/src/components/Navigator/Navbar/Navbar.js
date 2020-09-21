import React from 'react';
import Title from '../../Title/Title';
import Toolbar from '../Toolbar/Toolbar';
import Errorbar from '../Errorbar/Errorbar';

import './Navbar.css';

const Navbar = (props) => {
    const style = [props.admin == 1 ? "admin" : "user", "nav"].join(" ")
    const showErrorBar = props.error != '' ? true: false;
    return (
        <div>
            <div className={style}>
                <Title />
                <Toolbar
                    tabs={props.tabs}
                    menuFunc={(nav) => props.menuFunc(nav)}
                    page={props.page}
                    counter={props.counter}
                    viewPage={(p) => props.viewPage(p)}
                    searchProduct={(e) => props.searchProduct(e)}
                    admin={props.admin}
                    logout={() => props.logout()} />
            </div>
            { showErrorBar ? <Errorbar text={props.error} /> : null }        
        </div>
    )
}

export default Navbar;