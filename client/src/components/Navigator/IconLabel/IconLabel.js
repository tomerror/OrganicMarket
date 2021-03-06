import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Toolbar/Toolbar.module.css';

const IconLabel = (props) => {
    return (
        <div className={styles.cartSection}>
            <NavLink to={props.href}>
                <div className={props.css}>{props.children}</div>
            </NavLink>

            {props.text > 0 || props.show ?
                <div className={styles.counter}>
                    <div className={styles.number} onClick={() => props.labelClick()}>
                        {props.text}
                    </div>
                </div>
                : null
            }
        </div>
    )
}
export default IconLabel;