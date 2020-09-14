import React from 'react';
import styles from './Cube.module.css';

const Cube = (props) => {
    return (
        <div className={[styles.cube, props.cube.color].join(' ')}>
            <div className={styles.title}>{props.cube.title}</div>
            <div  className={styles.frameMessage}>
                <div className={styles.message}>
                    {props.cube.message}
                </div>
                <div className={styles.submessage}>
                    {props.cube.submessage}
                </div>
            </div>
        </div>
    )
}

export default Cube;