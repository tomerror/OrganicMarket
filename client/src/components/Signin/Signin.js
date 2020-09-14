import React from 'react';
import styles from '../Login/Login.module.css';

const Signin = ( props ) => {
    return (
        <div className={styles.form}>
            <div>
                <div className={styles.div}>
                    <input type="text" placeholder="Username" className={styles.LoginInput} onChange={(e) => props.onChange({ username: e.target.value })}/>
                </div>
                <div className={styles.div}>
                    <input type="password" placeholder="Password" className={styles.LoginInput} onChange={(e) => props.onChange({ password: e.target.value })}/>
                </div>
            </div>            
        </div>
    )
}

export default Signin;