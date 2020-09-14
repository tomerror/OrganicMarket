import React from 'react';
import styles from './PanelManager.module.css'

import Dropdown from '../Dropdown/Dropdown';

const panel = (props) => {
    return (
        <div className={styles.panel}>
            <div className={styles.title}>
                <div className={styles.titleText}>
                    {props.title}
                        </div>
                <div className={styles.filterBar}>
                    <select className={styles.select} name="tab" id="tab" onChange={(e) => props.dropFunc(e)}>
                        <option value="">{props.select}</option>
                        <Dropdown list={props.droplist} />
                    </select>
                </div>
            </div>
            <div className={styles.overflow}>
                {props.children}
            </div>
        </div>
    )
}

export default panel;