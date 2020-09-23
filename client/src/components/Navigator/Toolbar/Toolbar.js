import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../../context/user-context';
import CartContext from '../../../context/cart-context';
import styles from './Toolbar.module.css';
import Tabs from '../../Tabs/Tabs';
import IconLabel from '../IconLabel/IconLabel';
import Person from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Fingerprint from '@material-ui/icons/Fingerprint';
import SearchPanel from '../../SearchPanel/SearchPanel';

const Toolbar = (props) => {
    const userContext = useContext(UserContext);
    const cartContext = useContext(CartContext);
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
                    <SearchPanel toolbarInput={styles.toolbarInput} cartSection={styles.cartSection} css={iconStyle, searchStyle} search={(e) => props.searchProduct(e)} /> : null}

                {userContext.user.admin == 0 ? null :
                    <div className={styles.cartSection}>
                        <Link to="/manage">
                            <Fingerprint style={fingerStyle} onClick={() => props.viewPage('manage')} />
                        </Link>
                    </div>
                }

                <IconLabel text={cartContext.count} labelClick="/cart" href="/cart">
                    <ShoppingCartIcon style={iconStyle} />
                </IconLabel>

                <IconLabel show text='x' labelClick={() => props.logout()} href="/customer" secondHref="/">
                    <Person style={iconStyle} />
                </IconLabel>
            </div>
        </div>
    )
}



export default Toolbar;