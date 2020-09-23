import React, { useContext } from 'react';
import Title from '../../Logo/Logo';
import Toolbar from '../Toolbar/Toolbar';
import Errorbar from '../Errorbar/Errorbar';
import UserContext from '../../../context/user-context';

import './Navbar.css';

const Navbar = (props) => {
    const userContext = useContext(UserContext);
    const style = [userContext.user.admin == 1 ? "admin" : "user", "nav"].join(" ")
    const showErrorBar = props.error != '' ? true: false;
    return (
        <div>
            <div className={style}>
                <Title />
                <Toolbar
                    tabs={props.tabs}
                    menuFunc={(nav) => props.menuFunc(nav)}
                    page={props.page}
                    viewPage={(p) => props.viewPage(p)}
                    searchProduct={(e) => props.searchProduct(e)}
                    logout={() => props.logout()} />
            </div>
            { showErrorBar ? <Errorbar text={props.error} /> : null }        
        </div>
    )
}

export default Navbar;