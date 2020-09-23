import React from 'react';
import { Link } from 'react-router-dom';
import Tabs from '../../Tabs/Tabs';
import Logo from '../../Logo/Logo';

import styles from './Sidebar.module.css';

const Sidebar = (props) => {
    return (
        <div className={styles.Sidebar}>
            <Logo />
            <div >
                <Link to="/">
                    <Tabs tabs={props.tabs} menuFunc={(t) => props.menuFunc(t)} styles={styles} />
                </Link>
            </div>
        </div>
    )
}
export default Sidebar;