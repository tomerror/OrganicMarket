import React from 'react';
import styles from './Errorbar.module.css';

const errorbar = ( props ) => {
    return (
        <div className={styles.bar}>
          {props.text}
        </div>
    )
}

export default errorbar;