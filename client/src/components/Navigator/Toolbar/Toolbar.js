import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Toolbar.module.css';
import Tabs from '../../Tabs/Tabs';
import IconLabel from '../IconLabel/IconLabel';
import Person from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Fingerprint from '@material-ui/icons/Fingerprint';
import SearchPanel from '../../SearchPanel/SearchPanel';
import { connect } from 'react-redux';

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
                <Tabs tabs={props.tabs} menuFunc={(t) => props.menuFunc(t)} styles={styles} />
            </div>
            <div className={styles.buttonPanelStyle}>
                <SearchPanel toolbarInput={styles.toolbarInput} cartSection={styles.cartSection} css={iconStyle, searchStyle} search={(e) => props.searchProduct(e)} />

                { props.admin ? 
                    <div className={styles.cartSection}>
                        <NavLink to="/manage">
                            <Fingerprint style={fingerStyle} />
                        </NavLink>
                    </div> : null
                }

                <IconLabel text={props.cartSize} labelClick="/cart" href="/cart">
                    <ShoppingCartIcon style={iconStyle} />
                </IconLabel>

                <IconLabel show text='x' labelClick={() => props.logout()} href="/customer" secondHref="/">
                    <Person style={iconStyle} />
                </IconLabel>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        admin: state.user.admin,
        cartSize: state.cart.items.length
    }
}

export default connect(mapStateToProps)(Toolbar);