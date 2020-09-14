import React from 'react';
import styles from './Logger.module.css';

const Logger = (props) => {
    return (
        <div className={styles.row}>
            <div className={styles.cell}>
                {props.log.time}
            </div>
            <div className={styles.cell}>
                {props.log.username}
            </div>
            <div className={styles.cell}>
                {props.log.method}
            </div>
            <div className={styles.cell}>
                {props.log.path}
            </div>
            <div className={styles.cell}>
                {props.log.message}
            </div>
        </div>
    )
}

export default Logger;