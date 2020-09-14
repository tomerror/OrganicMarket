import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Toolbar.module.css';
import Tabs from '../Tabs/Tabs';
import ToolbarIcon from '../ToolbarIcon/ToolbarIcon';

import Person from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Fingerprint from '@material-ui/icons/Fingerprint';
import SearchPanel from '../SearchPanel/SearchPanel';

const Toolbar = (props) => {
    const iconStyle = { color: "#d8f3dc", fontSize: "40px", margin: "1%" }
    const fingerStyle = { color: "#e63946", fontSize: "40px", margin: "1%" }
    const searchStyle = {
        color: "rgb(45 106 79)",
        fontSize: "200%",
        position: "absolute",
        margin: "1%",
        top: "6%",
        left: "0%"
    }
    return (
        <div className={styles.toolbar}>
            <div className={styles.menuPanelStyle}>
                <Link to="/">
                    <Tabs tabs={props.tabs} menuFunc={(t) => props.menuFunc(t)} styles={styles} />
                </Link>
            </div>
            <div className={styles.buttonPanelStyle}>
                {props.page == 'shop' ?
                <SearchPanel toolbarInput={styles.toolbarInput} cartSection={styles.cartSection} css={iconStyle, searchStyle} search={(e) => props.searchProduct(e)} /> : null }

                {props.admin == 0 ? null :
                    <div className={styles.cartSection}>
                        <Link to="/manage">
                            <Fingerprint style={fingerStyle} onClick={() => props.viewPage('manage')} />
                        </Link>
                    </div>
                }

                <ToolbarIcon text={props.counter} labelClick="/cart" href="/cart">
                    <ShoppingCartIcon style={iconStyle}/>
                </ToolbarIcon>

                <ToolbarIcon show text='x' labelClick={() => props.logout()} href="/customer" secondHref="/">
                    <Person style={iconStyle}/>
                </ToolbarIcon>
            </div>
        </div>
    )
}
export default Toolbar;