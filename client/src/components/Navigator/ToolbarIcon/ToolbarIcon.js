import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Toolbar/Toolbar.module.css';

const ToolbarIcon = (props) => {
    return (
        <div className={styles.cartSection}>
            <Link to={props.href}>
                <div className={props.css}>{props.children}</div>
            </Link>

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
export default ToolbarIcon;